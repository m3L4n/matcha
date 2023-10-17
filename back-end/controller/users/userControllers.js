const { sendingMail } = require("../../mailing/mailing");
const { checkAndChange } = require("../../modules/response.js");
const {
  sendingEmailVerification,
} = require("../../mailing/sendEmailVerification");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { TokenModel } = require("../../models/Tokenmodel");
const { UserModel } = require("../../models/Usermodel");

class UserController {
  static signup = async (req, res, needValidation = false) => {
    try {
      const valided = false;
      const id = uuidv4();
      const { username, firstName, lastName, email, password } = req.body;
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
      const emailSend = await sendingEmailVerification(username);
      if (emailSend) {
        console.log("email send perfectly");
        return res.status(201).send(user);
      } else {
        console.log("token not created");
        return res.status(400).send("token not created");
      }
    } catch (error) {
      if (error == "user doesnt exist") {
        console.log("userdoesnt exist");

        return res.status(409).send("Details are not correct");
      }
      return res.status(500).send({ error: error });
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
            return res.cookie("jwt", token, { httpOnly: true, secure: false, maxAge: 3600000, sameSite: true }).status(201).send({ access_token: token });
          } else {
            return res.status(401).send({ msg: "user not verified" });
          }
        } else {
          return res.status(401).send({ msg: "Authentication failed" });
        }
      } else {
        return res.status(401).send({ msg: "Authentication failed" });
      }
    } catch (error) {
      return res.status(401).send({ msg: "Authentication failed" });
    }
  };

  static changePassword = async (req, res) => {
    try {
      const { id, password } = req.body;
      const psswdCrypt = await bcrypt.hash(password, 10);
      await UserModel.update(id, "password", psswdCrypt);
      return res.status(200).send("update sucessfuly");
    } catch (error) {
      return res.status(404).send("id are not in the db");
    }
  };

  static disconnectUser = async (_, res) => {
    res.clearCookie("jwt");
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
          msg: "Your verification link may have expired. Please click on resend for verify your Email.",
        });
      } else {
        const user = await UserModel.findbyId("id", id);
        if (!user) {
          console.log(user);

          return res.status(401).send({
            msg: "We were unable to find a user for this verification. Please SignUp!",
          });
        } else if (user.valided) {
          return res.status(200).send("you are already verified. Please Login");
        } else {
          const updated = await UserModel.update(id, "valided", true);
          console.log(updated);

          if (!updated) {
            return res.status(404).send({ msg: err.message });
          } else {
            return res
              .status(200)
              .send("Your account has been successfully verified");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  static sendEmailVerification = async (req, res) => {
    const username = req.body.username;
    try {
      const token = sendingEmailVerification(username);
      if (!token) {
        return res.status(401).json("email not in the db");
      }
      return res.status(200).json("email resend");
    } catch (error) {
      return res.status(404).json("can't send email, please write us");
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
      const user = await UserModel.findbyId("id", id);
      return res.status(200).json(user);
    } catch (e) {
      return res.status(400).send("This user doesn't exist.");
    }
  };

  static index = async (req, res) => {
    const { id } = req.authUser;
    const { action, age, location, fame, tags } = req.query;
    let users = await UserModel.getAll(id, {
      action,
      age,
      location,
      fame,
      tags,
    });
    return res.json(checkAndChange(users));
  };

  // static uploadImage = async (req, res) => {
  //   // const fileName = req.file.path;
  //   console.log(req);
  //   const fileBuffer = req.file.buffer;
  //   const { id } = req.authUser;
  //   try {
  //     const buffer = Buffer.from(fileBuffer);
  //     const base64String = buffer.toString("base64");
  //     const dataURL = `data:image/jpeg;base64,${base64String}`;
  //     await UserModel.uploadImageInDB("profile_picture", dataURL, id);
  //     res.status(201).json({ message: "image profile uploaded" });
  //   } catch (error) {
  //     res.status(404).json({ message: "cant upload image profile" });
  //   }
  // };

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
      return res.status(404).json({ error: "cant get all enum" });
    }
  };

  // static uploadPictureDescription = async (req, res) => {
  //   const files = req.files;
  //   const { id } = req.authUser;
  //   const pictureArray = [];
  //   files.map((file) => {
  //     const buffer = Buffer.from(file.buffer);
  //     const base64String = buffer.toString("base64");
  //     const dataURL = `data:image/jpeg;base64,${base64String}`;
  //     pictureArray.push(dataURL);
  //   });
  //   try {
  //     const res = await UserModel.uploadImageInDB("pictures", pictureArray, id);
  //     res.json(checkAndChange(res));
  //   } catch (error) {
  //     res.json(checkAndChange(error));
  //   }
  // };

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
    return res.status(204).json({ msg: "profil picture unchanged, no change" });
  };

  static updatePictureDescription = async (req, res) => {
    const { id } = req.authUser;
    const files = req.files;
    let picturesArray = req.body.images ? req.body.images : [];

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
    const result = await UserModel.updateAllInformation(userInfo);
    res.json(checkAndChange(result));
  };

  static getAllInfoUser = async (req, res) => {
    const { id } = req.params;
    const idRequester = req.params.id;
    const infomartionsUser = await UserModel.getAllInformationUser(id, idRequester);
    console.log(infomartionsUser);
    res.json(checkAndChange(infomartionsUser));
  };
}

module.exports = {
  UserController,
};
