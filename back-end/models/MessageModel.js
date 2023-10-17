const db = require("../db/db");

class MessageModel {
  /**
   * Get all messages from a given conversation id
   * @param {string} conversationId
   * @return {Promise}
   */
  static findMessagesFromConversation = (conversationId) => {
    return new Promise((next) => {
      db.query("SELECT * FROM messages WHERE id_conversation = $1", [
        conversationId,
      ])
        .then((result) => next(result.rows))
        .catch((error) => next(error));
    });
  };
}

module.exports = {
  MessageModel,
};
