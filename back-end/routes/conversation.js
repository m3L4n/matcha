const express = require("express");
const router = express.Router();
const {
  ConversationController,
} = require("../controller/conversationController");
const { isAuth } = require("../middlewares/userAuth");

router.get("/", isAuth, ConversationController.index);

module.exports = router;
