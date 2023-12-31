// routes/users.js
const express = require("express");
const router = express.Router();
const { UserController } = require("../../controller/users/userControllers");
const { isAuth } = require("../../middlewares/userAuth");
const multer = require("multer");
const upload = require("../../middlewares/uploadMulter");

router.post("/", UserController.signup);
router.get("/verify-email/:id/:token", UserController.verifyEmail);
router.post("/login", UserController.login);
router.post("/send-email-verification", UserController.sendEmailVerification);
router.post("/send-password-reset", UserController.sendEmailResetPassword);
router.get("/whoami", isAuth, UserController.getUser);
router.get("/matches", isAuth, UserController.index);
router.get("/:id", isAuth, UserController.show);

router.put("/changePassword", UserController.changePassword);
router.put("/reportFakeAccount", isAuth, UserController.reportAsFakeAccount);
router.delete("/disconnect", isAuth, UserController.disconnectUser);
router.get("/verify-email/:id/:token", UserController.verifyEmail);
router.post("/uploadProfilePicture", isAuth, upload.single("profilePicture"), UserController.updateProfilPicture);
router.get("/profil-picture", isAuth, UserController.getImageProfile);
router.get("/getAllInfoEnum", isAuth, UserController.getAllInfoEnum);
router.put("/updateInfoProfile", isAuth, UserController.updateInfoProfile);
router.post("/uploadPictureDescription", isAuth, upload.array("images"), UserController.updatePictureDescription);
router.get("/getInfo/:id", isAuth, UserController.getAllInfoUser);
module.exports = router;
