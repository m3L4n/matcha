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

  /**
   * Create a new message
   * @param {string} idUserRequester,
   * @param {string} idUserReceiver,
   * @param {string} content,
   * @param {string} conversationId
   * @return {Promise}
   */
  static createMessage = (
    idUserRequester,
    idUserReceiver,
    content,
    conversationId,
  ) => {
    return new Promise((next) => {
      db.query(
        "INSERT INTO messages(id_user_requester, id_user_receiver, content, id_conversation) \
        VALUES ($1, $2, $3, $4) RETURNING *",
        [idUserRequester, idUserReceiver, content, conversationId],
      )
        .then((result) => next(result))
        .catch((error) => next(error));
    });
  };
}

module.exports = {
  MessageModel,
};
