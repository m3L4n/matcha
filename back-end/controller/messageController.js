const { checkAndChange } = require("../modules/response");
const { MessageModel } = require("../models/MessageModel");

class MessageController {
  static index = async (req, res) => {
    const conversationId = req.params.conversationId;
    const messages =
      await MessageModel.findMessagesFromConversation(conversationId);
    return res.json(checkAndChange(messages));
  };
}

module.exports = {
  MessageController,
};
