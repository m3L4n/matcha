const { error } = require("../modules/response");
const db = require("../db/db");

class ConversationModel {
  /**
   * Get all conversations of a given user
   * @param {string} id
   * @returns {Promise}
   */
  static getAll = (id) => {
    return new Promise((next) => {
      db.query(
        "SELECT\
        c.id AS conversation_id,\
        u2.username AS chat_partner_name,\
        m.content AS last_message\
        FROM conversations c\
        JOIN users u1 ON c.id_user_1 = u1.id\
        JOIN users u2 ON c.id_user_2 = u2.id\
        LEFT JOIN messages m ON c.id = m.id_conversation\
        WHERE u1.id = $1 OR u2.id = $1",
        [id]
      )
        .then((result) => next(result))
        .catch((error) => next(error));
    });
  };
}

module.exports = {
  ConversationModel,
};
