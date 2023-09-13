// routes/users.js
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const userController = require("./userControllers");
const { signup, verifyEmail, login, sendEmailVerification, sendEmailResetPassword, getUser, changePassword, disconectUser } = userController;
const pool = require("../../db/db");
const { isAuth } = require("../../Middlewares/userAuth");

router.post("/", signup);
router.post("/login", login);
router.post("/send-email-verification", sendEmailVerification);
router.post("/send-password-reset", sendEmailResetPassword);

router.get("/verify-email/:id/:token", verifyEmail);
router.get("/whoami", isAuth, getUser);

router.put("/changePassword", changePassword);
router.delete("/disconect", isAuth, disconectUser);

module.exports = router;
