const { error } = require("../modules/response");
const db = require("../db/db");

class MatchModel {

  /**
    * Create a like
    * @param {string} receiverId
    * @param {string} requesterId
  **/
  static create = (receiverId, requesterId) => {
    return new Promise(next => {
      console.log("OK");
      db.query('SELECT "like" FROM match WHERE id_receiver = $1', [requesterId])
        .then(result => {
          if (!result.rows.length) {
            console.log("INSERT");
            db.query('INSERT INTO match("like", block, id_requester, id_receiver)  \
              VALUES(false, false, $1, $2)', [requesterId, receiverId])
              .then(result => next(result))
              .catch(error => next(error))
          } else {
            console.log("UPDATE");
            db.query('UPDATE match SET "like" = true \
              WHERE id_requester = $1 AND id_receiver = $2', [receiverId, requesterId])
              .then(result => next(result))
              .catch(error => next(error))
          }
        })
        .catch(error => next(error))
    });
  }
}

module.exports = {
  MatchModel,
};
