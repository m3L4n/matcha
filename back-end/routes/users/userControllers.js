const { sendingMail } = require("../../mailing/mailing");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const db = require("../../db/db");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userModel = require("../../models/Usermodel");
const tokenModal = require("../../models/Tokenmodel");
const { sendingEmailVerification } = require("../../mailing/sendEmailVerification");

const signup = async (req, res) => {
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
    const user = await userModel.createUser(data);
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

const verifyEmail = async (req, res) => {
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
      const user = await userModel.findbyId("id", id);
      if (!user) {
        console.log(user);

        return res.status(401).send({
          msg: "We were unable to find a user for this verification. Please SignUp!",
        });
      } else if (user.valided) {
        return res.status(200).send("User has been already verified. Please Login");
      } else {
        const updated = await userModel.update(id, "valided", true);
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

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findbyId("username", username);
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      if (isSame) {
        const verified = user.valided;
        if (verified) {
          const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: 1 * 24 * 60 * 60 * 1000,
          });
          return res.cookie("jwt", token, { httpOnly: true, secure: false, maxAge: 3600000, sameSite: true }).status(200).send({ access_token: token });
        } else {
          return res.status(401).send({ msg: "User not verified" });
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
const sendEmailVerification = async (req, res) => {
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
const sendEmailResetPassword = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await userModel.findbyId("email", email);
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
const changePassword = async (req, res) => {
  try {
    const { id, password } = req.body;
    console.log("id AND PASSWORD", id, password);
    const psswdCrypt = await bcrypt.hash(password, 10);
    await userModel.update(id, "password", psswdCrypt);
    return res.status(200).send("update sucessfuly");
  } catch (error) {
    return res.status(500).send("id are not in the db");
  }
};
const getUser = async (req, res) => {
  try {
    const { id, username } = req.authUser;
    const user = await userModel.findbyIwithouthPassword("id", id);
    return res.status(200).send(user);
  } catch (e) {
    return res.status(400).send("this user doesnt exist");
  }
};

//exporting the modules
module.exports = {
  signup,
  login,
  verifyEmail,
  sendEmailVerification,
  sendEmailResetPassword,
  changePassword,
  getUser,
};
