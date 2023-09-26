const { error } = require("../modules/response");
const db = require("../db/db");

class MatchModel {

  static async #updateElo(idUserToUpdate, idOpponent, actual_outcome) {
    // TODO update user elo when liked
    // RA current liked_user elo
    // RB current liker user elo
    // EA expected outcomes of the match (if like 1 if unlike 0 if same elo 0.5)
    // SA actual outcomes of the match (if like 1 if unlike 0)
    // K scaling factor (32)
    // RA + K * (SA - EA)
    let K = 32;
    try {
      const userToUpdate = await db.query("SELECT rate_fame from users WHERE id = $1", [idUserToUpdate]);
      const opponent = await db.query("SELECT rate_fame from users WHERE id = $1", [idOpponent]);
      let ra = userToUpdate.rows[0].rate_fame;
      let rb = opponent.rows[0].rate_fame;
      let expected_outcome = 0.5;
      if (ra > rb) {
        expected_outcome = 0;
      } else if (ra < rb) {
        expected_outcome = 1;
      }
      let updatedRateFame = ra + K * (actual_outcome * expected_outcome);
      return db.query("UPDATE users SET rate_fame = $1 WHERE id = $2", [updatedRateFame, idUserToUpdate]);
    } catch (error) {
      throw error;
    }
  }

  /**
    * Create a like
    * @param {string} receiverId
    * @param {string} requesterId
  **/
  static createLike = (receiverId, requesterId) => {
    this.#updateElo()
    return new Promise(next => {
      db.query('SELECT "like" FROM match WHERE id_receiver = $1', [requesterId])
        .then(result => {
          if (!result.rows.length) {
            db.query('INSERT INTO match("like", block, id_requester, id_receiver)  \
              VALUES(false, false, $1, $2)', [requesterId, receiverId])
              .then(result => next(result))
              .catch(error => next(error))
          } else {
            db.query('UPDATE match SET "like" = true \
              WHERE id_requester = $1 AND id_receiver = $2', [receiverId, requesterId])
              .then(result => next(result))
              .catch(error => next(error))
          }
        })
        .catch(error => next(error))
    });
  }

  /**
    * Delete a like
    * @param {string} receiverId
    * @param {string} requesterId
  **/
  static removeLike = (receiverId, requesterId) => {
    return new Promise(next => {
      db.query('SELECT "like" FROM match WHERE id_requester = $1', [requesterId])
        .then(result => {
          if (result.rows.length > 0) {
            db.query('UPDATE match SET "like" = false \
              WHERE id_requester = $1 AND id_receiver = $2', [requesterId, receiverId])
              .then(result => next(result))
              .catch(error => next(error))
          } else {
            next(result)
          }
        })
        .catch(error => next(error))
    })
  };
}

module.exports = {
  MatchModel,
};
