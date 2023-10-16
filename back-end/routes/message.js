const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/userAuth");
const { MessageController } = require("../controller/messageController");

router.get("/:conversationId", isAuth, MessageController.index);

module.exports = router;
