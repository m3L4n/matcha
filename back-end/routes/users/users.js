// routes/users.js
const express = require("express");
const router = express.Router();
const { UserController } = require("../../controller/users/userControllers");
const { isAuth } = require("../../middlewares/userAuth");

router.post("/", UserController.signup);
router.get("/verify-email/:id/:token", UserController.verifyEmail);
router.post("/login", UserController.login);
router.post("/send-email-verification", UserController.sendEmailVerification);
router.post("/send-password-reset", UserController.sendEmailResetPassword);
router.get("/whoami", isAuth, UserController.getUser);
router.get("/matches", isAuth, UserController.getUsers);

module.exports = router;
