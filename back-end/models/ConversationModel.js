const db = require("../db/db");

class ConversationModel {
  /**
   * Get all conversations of a given user
   * @param {string} currentUserID
   * @returns {Promise}
   */
  static getAll = (currentUserID) => {
    return new Promise((next) => {
      db.query(
        "SELECT\
          DISTINCT ON (c.id) c.id AS conversation_id,\
          CASE\
            WHEN u1.id = $1 THEN u2.id\
            WHEN u2.id = $1 THEN u1.id\
          END AS chat_partner_id,\
          CASE\
            WHEN u1.id = $1 THEN u2.username\
            WHEN u2.id = $1 THEN u1.username\
          END AS chat_partner_name,\
          m.content AS last_message\
        FROM conversations c\
        JOIN users u1 ON c.id_user_1 = u1.id\
        JOIN users u2 ON c.id_user_2 = u2.id\
        LEFT JOIN messages m ON c.id = m.id_conversation\
        WHERE u1.id = $1 OR u2.id = $1",
        [currentUserID],
      )
        .then((result) => next(result))
        .catch((error) => next(error));
    });
  };

  /**
   * Delete conversation with all it messages
   * @param {string} requesterId
   * @param {string} receiverId
   * @returns {Promise}
   */
  static delete = (requesterId, receiverId) => {
    return new Promise((next) => {
      db.query(
        "DELETE FROM conversations\
        WHERE (id_user_1 = $1 AND id_user_2 = $2)\
        OR (id_user_1 = $2 AND id_user_2 = $1)\
        RETURNING id",
        [requesterId, receiverId],
      )
        .then((result) => {
          const { id: conversationId } = result.rows[0];
          db.query(
            "DELETE FROM messages\
          WHERE id_conversation = $1\
          RETURNING *",
            [conversationId],
          )
            .then((result) => next(result))
            .catch((error) => next(error));
        })
        .catch((error) => next(error));
    });
  };
}

module.exports = {
  ConversationModel,
};
