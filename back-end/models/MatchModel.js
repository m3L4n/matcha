const { error } = require("../modules/response");
const db = require("../db/db");

class MatchModel {
  static #updateElo(idPlayer, idOpponent, actual_outcome = 1) {
    const K = 32;
    return new Promise((next) => {
      db.query("SELECT rate_fame from users WHERE id = $1", [idPlayer])
        .then((userToUpdate) => {
          const currentUserRating = userToUpdate.rows[0].rate_fame;
          db.query("SELECT rate_fame from users WHERE id = $1", [idOpponent])
            .then((opponent) => {
              const opponentRating = opponent.rows[0].rate_fame;
              let expected_outcome = 0.5;
              if (currentUserRating > opponentRating) {
                expected_outcome = 0;
                actual_outcome = 0;
              } else if (currentUserRating < opponentRating) {
                expected_outcome = 1;
              }
              let updatedRateFame =
                currentUserRating + K * (actual_outcome - expected_outcome);
              db.query("UPDATE users SET rate_fame = $1 WHERE id = $2", [
                updatedRateFame,
                idPlayer,
              ])
                .then((result) => next(result))
                .catch((error) => next(error));
            })
            .catch((error) => next(error));
        })
        .catch((error) => next(error));
    });
  }

  /**
   * Create a like
   * @param {string} receiverId
   * @param {string} requesterId
   **/
  static createLike = (requesterId, receiverId) => {
    return new Promise((next) => {
      db.query('SELECT "like" FROM match WHERE id_requester = $1', [receiverId])
        .then((result) => {
          this.#updateElo(receiverId, requesterId)
            .then(() => {
              if (!result.rows.length) {
                console.log("COUCOU");
                console.log(`${requesterId} | ${receiverId}`);
                db.query(
                  'INSERT INTO match("like", block, id_requester, id_receiver)  \
                VALUES(false, false, $1, $2)',
                  [requesterId, receiverId]
                )
                  .then((result) => next(result))
                  .catch((error) => next(error));
              } else {
                console.log("OULAH");
                db.query(
                  'UPDATE match SET "like" = true \
                WHERE id_requester = $1 AND id_receiver = $2',
                  [receiverId, requesterId]
                )
                  .then((result) => {
                    db.query(
                      "INSERT INTO conversations(id_user_1, id_user_2) \
                      VALUES($1, $2)",
                      [requesterId, receiverId]
                    )
                      .then((result) => next(result))
                      .catch((error) => next(error));
                  })
                  .catch((error) => next(error));
              }
            })
            .catch((error) => next(error));
        })
        .catch((error) => next(error));
    });
  };

  /**
   * Delete a like
   * @param {string} receiverId
   * @param {string} requesterId
   **/
  static removeLike = (receiverId, requesterId) => {
    return new Promise((next) => {
      db.query('SELECT "like" FROM match WHERE id_requester = $1', [
        requesterId,
      ])
        .then((result) => {
          this.#updateElo(receiverId, requesterId, 0)
            .then(() => {
              if (result.rows.length > 0) {
                db.query(
                  'UPDATE match SET "like" = false \
              WHERE id_requester = $1 AND id_receiver = $2',
                  [requesterId, receiverId]
                )
                  .then((result) => next(result))
                  .catch((error) => next(error));
              } else {
                next(result);
              }
            })
            .catch((error) => next(error));
        })
        .catch((error) => next(error));
    });
  };
}

module.exports = {
  MatchModel,
};
