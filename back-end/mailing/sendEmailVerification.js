const { sendingMail } = require("./mailing");
const db = require("../db/db");
const crypto = require("crypto");
const { UserModel } = require("../models/Usermodel");
const { TokenModel } = require("../models/Tokenmodel");
module.exports.sendingEmailVerification = async (username) => {
  try {
    const user = await UserModel.findbyId("username", username);
    if (user) {
      const userToken = await TokenModel.findToken(user.id);
      if (userToken != undefined) {
        await TokenModel.deleteToken(user.id);
      }
      const token = crypto.randomBytes(16).toString("hex");
      const tokenCreated = await TokenModel.createToken({ user_id: user.id, token: token });
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

    const error = new Error("user doesnt exist cant send email");
    error.status = 401;
    throw error;
  } catch (e) {
    const error = new Error("user doesnt exist cant send email");
    error.status = 404;
    throw error;
  }
};
