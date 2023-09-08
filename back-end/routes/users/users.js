// routes/users.js
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const userController = require("./userControllers");
const { signup, verifyEmail, login, sendEmailVerification, sendEmailResetPassword, getUser, changePassword } = userController;
const pool = require("../../db/db");
const { isAuth } = require("../../Middlewares/userAuth");

router.post("/", signup);
router.get("/verify-email/:id/:token", verifyEmail);
router.post("/login", login);
router.post("/send-email-verification", sendEmailVerification);
router.post("/send-password-reset", sendEmailResetPassword);
router.put("/changePassword", changePassword);
router.get("/whoami", isAuth, getUser);

module.exports = router;
