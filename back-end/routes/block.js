const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/userAuth");
const { BlockController } = require("../controller/blockController");

router.put("/", isAuth, BlockController.update);
module.exports = router;
