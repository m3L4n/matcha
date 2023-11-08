const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/userAuth");
const { BlockController } = require("../controller/blockController");

router.put("/", isAuth, BlockController.update);
router.get("/", isAuth, BlockController.getAll);
module.exports = router;
