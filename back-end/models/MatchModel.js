const { error } = require("../modules/response");
const db = require("../db/db");

class MatchModel {

  static #updateElo(idPlayer, idOpponent, actual_outcome) {
    const K = 32;
    return new Promise(next => {
      db.query("SELECT rate_fame from users WHERE id = $1", [idPlayer])
        .then(userToUpdate => {
          const currentUserRating = userToUpdate.rows[0].rate_fame;
          db.query("SELECT rate_fame from users WHERE id = $1", [idOpponent])
            .then(opponent => {
              const opponentRating = opponent.rows[0].rate_fame;
              let expected_outcome = 0.5;
              if (currentUserRating > opponentRating) {
                expected_outcome = 0;
              } else if (currentUserRating < opponentRating) {
                expected_outcome = 1;
              }
              let updatedRateFame = currentUserRating + K * (actual_outcome - expected_outcome);
              db.query("UPDATE users SET rate_fame = $1 WHERE id = $2", [updatedRateFame, idOpponent])
                .then(result => next(result))
                .catch(error => next(error))
            })
            .catch(error => next(error))
        })
        .catch(error => next(error))
    })
  }

  /**
    * Create a like
    * @param {string} receiverId
    * @param {string} requesterId
  **/
  static createLike = (receiverId, requesterId) => {
    return new Promise(next => {
      db.query('SELECT "like" FROM match WHERE id_receiver = $1', [requesterId])
        .then(result => {
          this.#updateElo(receiverId, requesterId, 1)
            .then(() => {
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
          this.#updateElo(receiverId, requesterId, 0)
            .then(() => {
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
        .catch(error => next(error))
    })
  };
}

module.exports = {
  MatchModel,
};
