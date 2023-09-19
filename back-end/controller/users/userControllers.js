const { sendingMail } = require("../../mailing/mailing");
const { checkAndChange } = require("../../modules/response.js");
const { sendingEmailVerification } = require("../../mailing/sendEmailVerification");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const tokenModal = require("../../models/Tokenmodel");
const UserModel = require("../../models/Usermodel");

class UserController {
  static signup = async (req, res, needValidation = false) => {
    try {
      const valided = needValidation;
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
      // if (user) {
      const emailSend = await sendingEmailVerification(username);
      if (emailSend) {
        return res.status(201).send(user);
      } else {
        return res.status(400).send("token not created");
      }
    } catch (error) {
      if (error == "user doesnt exist") {
        return res.status(409).send("Details are not correct");
      }
      return res.status(500).send({ error: error });
    }
  };

  static verifyEmail = async (req, res) => {
    try {
      const token = req.params.token;
      const id = req.params.id;

      const usertoken = await tokenModal.verifyToken({
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
          return res.status(200).send("UserModel has been already verified. Please Login");
        } else {
          const updated = await UserModel.update(id, "valided", true);
          console.log(updated);

          if (!updated) {
            return res.status(500).send({ msg: err.message });
          } else {
            return res.status(200).send("Your account has been successfully verified");
          }
        }
      }
    } catch (error) {
      console.log(error);
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
            return res.status(401).send({ msg: "UserModel not verified" });
          }
        } else {
          return res.status(401).send({ msg: "Authentication failed" });
        }
      } else {
        return res.status(401).send({ msg: "Authentication failed" });
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
      return res.status(500).json("can't send email, please write us");
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
      return res.status(500).json("email are not in the db");
    }
  };

  static getUser = async (req, res) => {
    try {
      const { id } = req.authUser;
      const user = await UserModel.findbyIwithouthPassword("id", id);
      return res.status(200).send(user);
    } catch (e) {
      return res.status(400).send("this user doesnt exist");
    }
  };

  static getUsers = async (req, res) => {
    const { id } = req.authUser;
    let users = await UserModel.getAll(id);
    res.json(checkAndChange(users));
  }
}

module.exports = {
  UserController,
};
