const express = require("express");
const { authContrroller } = require("../controller/authController");
const router = express.Router();

router.get("/discord", authContrroller.handleConnectionDiscord);
module.exports = router;
