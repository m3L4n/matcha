const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/userAuth");
const { MatchController } = require("../controller/matchController");

router.post("/create", isAuth, MatchController.create);

module.exports = router;
