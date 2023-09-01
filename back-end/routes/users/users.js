// routes/users.js
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const userController = require("./userControllers");
const { signup, verifyEmail, login } = userController;
const pool = require("../../db/db");

router.post("/", signup);
router.get("/verify-email/:id/:token", verifyEmail);
router.post("/login", login);
module.exports = router;
