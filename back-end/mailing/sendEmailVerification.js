const { sendingMail } = require("./mailing");
const db = require("../db/db");
const crypto = require("crypto");
const userModel = require("../models/Usermodel");
const tokenModal = require("../models/Tokenmodel");
module.exports.sendingEmailVerification = async (username) => {
  try {
    const user = await userModel.findbyId("username", username);
    if (user) {
      const userToken = await tokenModal.findToken(user.id);
      if (userToken != undefined) {
        await tokenModal.deleteToken(user.id);
      }
      const token = crypto.randomBytes(16).toString("hex");
      const tokenCreated = await tokenModal.createToken({ user_id: user.id, token: token });
      if (tokenCreated) {
        sendingMail({
          from: "no-reply@matcha-42.com",
          to: `${user.email}`,
          subject: "Account Verification Link",
          text: `Hello, ${user.username} Please verify your email by
          clicking this link :
          http://localhost:4000/users/verify-email/${user.id}/${token} `,
        });
        return tokenCreated;
      }
    }
    throw "user doesnt exist";
  } catch (e) {
    throw e;
  }
};
