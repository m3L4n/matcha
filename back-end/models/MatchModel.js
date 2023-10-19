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
              let updatedRateFame = currentUserRating + K * (actual_outcome - expected_outcome);
              db.query("UPDATE users SET rate_fame = $1 WHERE id = $2", [updatedRateFame, idPlayer])
                .then((result) => next(result))
                .catch((error) => next(error));
            })
            .catch((error) => next(error));
        })
        .catch((error) => next(error));
    });
  }

  /**
   * create a new match with paramter modifiable
   * @param {String} id_requester
   * @param {String} id_receiver
   * @param {boolean} like //
   * @param {boolean} block
   */
  static #createMatch = (id_requester, id_receiver, like = false, block = false) => {
    return new Promise((next) => {
      db.query(
        `INSERT INTO match (id_requester, id_receiver, "like", "block") \
      VALUES ($1, $2, $3, $4) RETURNING *`,
        [id_requester, id_receiver, like, block]
      )
        .then((match) => {
          if (match.rowCount == 1) {
            return next(match);
          } else {
            const error = new Error("cant create new match");
            error.status = 500;
            return next(error);
          }
        })
        .catch((error) => {
          return next(error);
        });
    });
  };

  static getRelationship = (requesterId, receiverId) => {
    return new Promise((next) => {
      db.query(`SELECT "like", "block" FROM match WHERE id_requester = $1 AND id_receiver= $2`, [requesterId, receiverId])
        .then((data) => {
          const relationShipData = {
            like: false,
            block: false,
          };
          if (data.rowCount == 1) {
            relationShipData.like = data.rows[0].like;
            relationShipData.block = data.rows[0].block;
          }
          return next(relationShipData);
        })
        .catch((error) => next(error));
    });
    //   if like
    //   if block
  };

  /**
   * Create a like
   * @param {string} receiverId
   * @param {string} requesterId
   * @returns {Promise}
   **/

  static createLike = (requesterId, receiverId) => {
    return new Promise((next) => {
      db.query('SELECT "like" FROM match WHERE id_requester = $1', [receiverId])
        .then((result) => {
          this.#updateElo(receiverId, requesterId, 1)
            .then(() => {
              if (!result.rows.length) {
                db.query(
                  'INSERT INTO match("like", block, id_requester, id_receiver)  \
                VALUES(false, false, $1, $2)',
                  [requesterId, receiverId]
                )
                  .then((result) => next(result))
                  .catch((error) => next(error));
              } else {
                db.query(
                  'UPDATE match SET "like" = true \
                WHERE id_requester = $1 AND id_receiver = $2',
                  [receiverId, requesterId]
                )
                  .then((result) => next(result))
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
   * @returns {Promise}
   **/

  static removeLike = (receiverId, requesterId) => {
    return new Promise((next) => {
      db.query('SELECT "like" FROM match WHERE id_requester = $1', [requesterId])
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
  /**
   *
   * @param {String} requesterId  // current user
   * @param {String} receiverId  // the user block
   * @param {boolean} block // true need to block  false need to unblock
   * @returns {Object} // return the row modified
   */
  static blockUser = (requesterId, receiverId, block = true) => {
    console.log(requesterId, "receiver", receiverId);
    return new Promise((next) => {
      db.query("SELECT * FROM match WHERE id_requester = $1 AND id_receiver = $2", [requesterId, receiverId])
        .then((match) => {
          if (match.rowCount == 0) {
            this.#createMatch(requesterId, receiverId, false, true)
              .then((data) => {
                this.#updateElo(requesterId, receiverId, 0)
                  .then((data) => {
                    if (data.rowCount == 1) {
                      return next(data);
                    } else {
                      const error = new Error("warning cant update elo");
                      error.status = 500;
                      return next(error);
                    }
                  })
                  .catch((error) => next(error));
              })
              .catch((error) => next(error));
          } else {
            const id = match.rows[0].id;
            db.query(
              `UPDATE match set "like" = false, "block" = $1 \
            WHERE id = $2 RETURNING *`,
              [block, id]
            )
              .then((updateData) => {
                if (updateData.rowCount == 1) {
                  return next(updateData);
                } else {
                  const error = new Error("warning cant update elo");
                  error.status = 500;
                  return next(error);
                }
              })
              .catch((error) => next(error));
          }
        })
        .catch((error) => next(error));
    });
  };
}

module.exports = {
  MatchModel,
};
