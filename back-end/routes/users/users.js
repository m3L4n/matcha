// routes/users.js
const express = require("express");
const router = express.Router();
const { UserController } = require("../../controller/users/userControllers");
const { isAuth } = require("../../middlewares/userAuth");
const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });
const storage = multer.memoryStorage(); // Stockage en mémoire pour les fichiers
const upload = multer({ storage });
// const upload = multer({ storage: storage });

router.post("/", UserController.signup);
router.get("/verify-email/:id/:token", UserController.verifyEmail);
router.post("/login", UserController.login);
router.post("/send-email-verification", UserController.sendEmailVerification);
router.post("/send-password-reset", UserController.sendEmailResetPassword);
router.get("/whoami", isAuth, UserController.getUser);
router.get("/matches", isAuth, UserController.getUsers);
router.delete("/disconnect", isAuth, UserController.disconnectUser);
router.get("/verify-email/:id/:token", UserController.verifyEmail);
router.post("/upload-image", isAuth, upload.single("image"), UserController.uploadImage);
router.get("/profil-picture", isAuth, UserController.getImageProfile);
router.get("/getAllInfoEnum", isAuth, UserController.getAllInfoEnum);
module.exports = router;
