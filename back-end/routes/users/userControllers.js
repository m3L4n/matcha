const { sendingMail } = require("../../mailing/mailing");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const db = require("../../db/db");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userModel = require("../../models/Usermodel");
const tokenModal = require("../../models/Tokenmodel");

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
    const token = crypto.randomBytes(16).toString("hex");
    if (user) {
      let setToken = await tokenModal.createToken({
        user_id: id,
        token: token,
      });

      if (setToken) {
        sendingMail({
          from: "no-reply@matcha-42.com",
          to: `${email}`,
          subject: "Account Verification Link",
          text: `Hello, ${username} Please verify your email by
                clicking this link :
                http://localhost:4000/users/verify-email/${id}/${token} `,
        });
      } else {
        return res.status(400).send("token not created");
      }
      return res.status(201).send(user);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
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
    console.log("REQ", req.cookies);
    const user = await userModel.findbyId("username", username);

    console.log(user);
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      if (isSame) {
        const verified = user.valided;
        if (verified) {
          const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: 1 * 24 * 60 * 60 * 1000,
          });
          // secure on false for dev
          return res.cookie("jwt", token, { httpOnly: true, secure: false, maxAge: 3600000, samesite: "none" }).status(201).send({ access_token: token });
        } else {
          return res.status(401).send("User not verified");
        }
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
  }
};

//exporting the modules
module.exports = {
  signup,
  login,
  verifyEmail,
};
