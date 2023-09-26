const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/userAuth");
const { MatchController } = require("../controller/matchController");

router.post("/create", isAuth, MatchController.create);
router.put("/unlike", isAuth, MatchController.delete);

module.exports = router;
