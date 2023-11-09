const { sendingMail } = require("../../mailing/mailing");
const { checkAndChange } = require("../../modules/response.js");
const { sendingEmailVerification } = require("../../mailing/sendEmailVerification");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { TokenModel } = require("../../models/Tokenmodel");
const { UserModel } = require("../../models/Usermodel");
const { response } = require("express");

class UserController {
  static #checkEMail = async (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(email)) {
      return false;
    }
    return true;
  };
  static #checkPassword = (password) => {
    const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return pattern.test(password);
  };
  static #checkUsername = (username) => {
    if (username.length > 20) {
      return false;
    }
    return true;
  };
  static #checkUniqueUsername = async (username) => {
    try {
      await UserModel.findUniqueKey("username", username);
      return false;
    } catch (error) {
      return true; // unique username
    }
  };
  static #checkUniqueEmail = async (email) => {
    try {
      await UserModel.findUniqueKey("email", email);
      return false;
    } catch (error) {
      return true; // unique username
    }
  };
  static #checkUniqueEmailNotOur = async (email, id) => {
    try {
      await UserModel.FindUniqueEmailNotOur(id, email);
      return false;
    } catch (error) {
      return true;
    }
  };

  static signup = async (req, res, needValidation = false) => {
    const { username, firstName, lastName, email, password } = req.body;
    if (!this.#checkEMail(email) || !this.#checkPassword(password) || !this.#checkUsername(username)) {
      return res.status(400).json({ status: 400, msg: "parameter non valid" });
    }
    const isUniqueUsername = await this.#checkUniqueUsername(username);
    const isUniqueEmail = await this.#checkUniqueEmail(email);
    if (!isUniqueUsername) {
      return res.status(400).json({ status: 400, msg: "username need to be unique" });
    } else if (!isUniqueEmail) {
      return res.status(400).json({ status: 400, msg: "email need to be unique" });
    }
    try {
      const valided = false;
      const id = uuidv4();
      const data = {
        id,
        username,
        firstName,
        lastName,
        email,
        password: await bcrypt.hash(password, 10),
        valided,
      };
      const user = await UserModel.createUser(data);
      if (user) {
        const emailSend = await sendingEmailVerification(username); // throw error if doesn't work
        if (emailSend) {
          return res.status(201).json({ status: 201, msg: "users successfully create" });
        } else {
          return res.status(404).json({ status: 404, msg: "token not created" });
        }
      }
      return res.status(404).json({ status: 404, msg: "users doesn't can be created " });
    } catch (error) {
      return res.status(error.status).json({ status: error.status, msg: error.msg });
    }
  };

  static login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findbyId("username", username);
      if (user) {
        const isSame = await bcrypt.compare(password, user.password);

        if (isSame) {
          const verified = user.valided;
          if (verified) {
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
              expiresIn: 1 * 24 * 60 * 60 * 1000,
            });
            return res
              .cookie("jwt", token, {
                httpOnly: true,
                sameSite: true,
                maxAge: 86400000,
              })
              .status(201)
              .send({ status: 201, userId: user.id, access_token: token });
          } else {
            return res.status(401).json({ status: 401, msg: "user not verified" });
          }
        } else {
          return res.status(403).json({ status: 403, msg: "username and password doesn't match" });
        }
      } else {
        return res.status(403).json({ status: 403, msg: "user doesn't exist" });
      }
    } catch (error) {
      return res.status(403).json({ status: 403, msg: "user doesn't exist" });
    }
  };

  static changePassword = async (req, res) => {
    try {
      const { id, password } = req.body;
      if (!this.#checkPassword(password)) {
        return res.status(400).json({
          status: 400,
          msg: "password doesn't respect the security test",
        });
      }
      const psswdCrypt = await bcrypt.hash(password, 10);
      await UserModel.update(id, "password", psswdCrypt);
      return res.status(200).json({ status: 200, msg: "update successfully" });
    } catch (error) {
      return res.status(404).json({ status: 200, msg: "id are not in the db" });
    }
  };

  static disconnectUser = async (_, res) => {
    res
      .clearCookie("jwt", {
        maxAge: -1000,
        httpOnly: true,
        sameSite: true,
      })
      .status(200)
      .json({ message: "Successfully logged out 😏 🍀" });
    res.end();
  };

  /** ALL CONTROLLER EMAIL */
  static verifyEmail = async (req, res) => {
    try {
      const token = req.params.token;
      const id = req.params.id;

      const usertoken = await TokenModel.verifyToken({
        id,
        token,
      });
      if (!usertoken) {
        return res.status(400).send({
          status: 400,
          msg: "Your verification link may have expired. Please click on resend for verify your Email.",
        });
      } else {
        const user = await UserModel.findbyId("id", id);
        if (!user) {
          return res.status(401).json({
            status: 401,
            msg: "We were unable to find a user for this verification. Please SignUp!",
          });
        } else if (user.valided) {
          return res.status(200).json({
            status: 200,
            msg: "you are already verified. Please Login",
          });
        } else {
          const updated = await UserModel.update(id, "valided", true);

          if (!updated) {
            return res.status(404).json({
              status: 404,
              msg: "email cant be verified now, please retry later",
            });
          } else {
            return res.status(200).send("Your account has been successfully verified");
          }
        }
      }
    } catch (error) {
      return res.status(404).json({ status: 404, msg: error.msg });
    }
  };

  static sendEmailVerification = async (req, res) => {
    const username = req.body.username;
    try {
      const token = sendingEmailVerification(username);
      if (!token) {
        return res.status(400).json({ status: 400, msg: "email not in the db" });
      }
      return res.status(200).json({ status: 200, msg: "email resend" });
    } catch (error) {
      return res.status(404).json({ status: 404, msg: "can't send email, please write us" });
    }
  };

  static sendEmailResetPassword = async (req, res) => {
    const email = req.body.email;
    try {
      const user = await UserModel.findbyId("email", email);
      if (!user) {
        return res.status(401).json("email are not in the db");
      }
      sendingMail({
        from: "no-reply@matcha-42.com",
        to: `${user.email}`,
        subject: "reset your password",
        text: `Hello, ${user.username}
        if you want to reset you password you can with this link :
          http://localhost:3000/reset-password/${user.id}`,
      });
      return res.status(200).json("password email send");
    } catch (error) {
      return res.status(404).json("email are not in the db");
    }
  };

  /** get user by id for /whoami */
  static getUser = async (req, res) => {
    try {
      const { id } = req.authUser;
      const user = await UserModel.findbyIwithouthPassword("id", id);
      return res.status(200).send(user);
    } catch (e) {
      return res.status(404).json({ msg: "this user doesnt exist" });
    }
  };

  static show = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await UserModel.findbyIwithouthPassword("id", id);
      return res.status(200).json(user);
    } catch (e) {
      return res.status(400).send("This user doesn't exist.");
    }
  };

  static index = async (req, res) => {
    const { id } = req.authUser;
    const { action, age, location, fame, tags } = req.query;
    try {
      let users = await UserModel.getAll(id, {
        action,
        age,
        location,
        fame,
        tags,
      });
      const response = checkAndChange(users);
      return res.status(response.code).json(response);
    } catch (e) {
      return res.status(404).json(response);
    }
  };

  static getImageProfile = async (req, res) => {
    const { id } = req.authUser;
    try {
      const imageProfile = await UserModel.getImageProfil(id);
      const buffer = Buffer.from(imageProfile);
      const base64String = buffer.toString("base64");
      const dataURL = `data:image/jpeg;base64,${base64String}`;
      return res.status(200).json(dataURL);
    } catch (err) {
      res.status(404).json({ error: "cant get the image Profile" });
    }
  };

  /** GET ALL THE ENUM FROM THE DB  */
  static getAllInfoEnum = async (req, res) => {
    try {
      const allEnum = await UserModel.getAllEnum();
      return res.status(200).json(allEnum);
    } catch (error) {
      return res.status(404).json({ status: 404, error: "cant get all enum" });
    }
  };

  /** UPLOAD PICTURES  */
  static updateProfilPicture = async (req, res) => {
    const { id } = req.authUser;
    const file = req.file;
    if (file instanceof Object) {
      const buffer = Buffer.from(file.buffer);
      const base64String = buffer.toString("base64");
      const dataURL = `data:image/jpeg;base64,${base64String}`;
      return res.json(checkAndChange(await UserModel.uploadImageInDB("profile_picture", dataURL, id)));
    }
    return res.status(204).json({ status: 204, msg: "profil picture unchanged, no change" });
  };

  static updatePictureDescription = async (req, res) => {
    const { id } = req.authUser;
    const files = req.files;
    let picturesArray = req.body.images ? req.body.images : [];
    if (!Array.isArray(picturesArray)) {
      picturesArray = [];
    }
    for (let file of files) {
      if (file instanceof Object) {
        const buffer = Buffer.from(file.buffer);
        const base64String = buffer.toString("base64");
        const dataURL = `data:image/jpeg;base64,${base64String}`;
        picturesArray.push(dataURL);
      } else {
        picturesArray.push(file);
      }
    }
    res.json(checkAndChange(await UserModel.uploadImageInDB("pictures", picturesArray, id)));
  };

  /**  GET INFO PROFIL FOR USER PROFIL */
  static updateInfoProfile = async (req, res) => {
    const userInfo = req.body;
    const { id } = req.authUser;
    userInfo.id = id;
    const isUniqueEmail = await this.#checkUniqueEmailNotOur(userInfo.email, id);
    if (!isUniqueEmail) {
      return res.status(400).json({
        status: 400,
        msg: "Email has to be unique, you need to put another email",
      });
    }
    const result = await UserModel.updateAllInformation(userInfo);
    res.json(checkAndChange(result));
  };

  static getAllInfoUser = async (req, res) => {
    const { id } = req.authUser;
    const idReceiver = req.params.id;
    const infomartionsUser = await UserModel.getAllInformationUser(id, idReceiver);
    res.json(checkAndChange(infomartionsUser));
  };
  /** REPORT AS FAKE ACCOUNT */

  static reportAsFakeAccount = async (req, res) => {
    const idReceiver = req.body.id;
    const resultat = await UserModel.reportAsFakeAccount(idReceiver);
    res.json(checkAndChange(resultat));
  };
}

module.exports = {
  UserController,
};
