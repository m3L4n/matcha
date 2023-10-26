const { checkAndChange } = require("../modules/response");
const { ConversationModel } = require("../models/ConversationModel");

class ConversationController {
  static index = async (req, res) => {
    const { id: currentUserID } = req.authUser;
    let conversations = await ConversationModel.getAll(currentUserID);
    return res.json(checkAndChange(conversations));
  };
}

module.exports = {
  ConversationController,
};
