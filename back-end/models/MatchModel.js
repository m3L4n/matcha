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

  static update(id_requester, id_receiver, like, block) {
    return new Promise((next) => {
      db.query(`UPDATE match SET block = $1, like= $2 WHERE id_requester = $3 AND id_receiver = $4 OR id_requester = $4 AND id_receiver = $3 RETURNING * `, [
        block,
        like,
        id_requester,
        id_receiver,
      ])
        .then((data) => {
          next(data);
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
      db.query(`SELECT * FROM match WHERE id_requester = $1 AND id_receiver = $2 OR id_requester = $2 AND id_receiver = $1`, [id_requester, id_receiver])
        .then((match) => {
          if (match.rowCount > 0) {
            this.update(id_requester, id_receiver, like, block)
              .then((data) => {
                let elo = 0;
                if (like == true || block == true) {
                  elo = 1;
                }
                this.#updateElo(id_requester, id_receiver, elo)
                  .then((eloUpdate) => next(eloUpdate))
                  .catch((error) => next(error));
              })
              .catch((error) => next(error));
          } else {
            db.query(
              `INSERT INTO match (id_requester, id_receiver, "like", "block") \
      VALUES ($1, $2, $3, $4) RETURNING *`,
              [id_requester, id_receiver, like, block]
            )
              .then((dataInserted) => {
                if (dataInserted.rowCount > 0) {
                  console.log("create match ok with this arg : like :", like, "block:", block);
                  let elo = 0;
                  if (like == true || block == true) {
                    elo = 1;
                  }
                  this.#updateElo(id_requester, id_receiver, elo)
                    .then((eloUpdate) => next(eloUpdate))
                    .catch((error) => next(error));
                } else {
                  const error = new Error("cant create new match");
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

  static getRelationShipv2 = (requesterId, receiverId) => {
    return new Promise((next) => {
      // on cherche a savoir si ya un like + si dans la table block avec le requester id = requested _id
      db.query(
        'SELECT  block."blocked", match.id_requester, match."like" FROM match FULL JOIN block  ON match.id_requester = block.id_requester  WHERE match.id_requester = $1 AND match.id_receiver= $2 ',
        [requesterId, receiverId]
      )
        .then((data) => {
          if (data.rowCount == 1) {
            const obj = data.rows[0];
            if (!data.rows[0].like) {
              obj.like = true;
            }
            return next(obj);
          } else {
            db.query(
              'SELECT  block."blocked", match.id_requester, match."like" FROM match FULL JOIN block  ON match.id_requester = block.id_requester  WHERE match.id_requester = $2 AND match.id_receiver= $1 ',
              [requesterId, receiverId]
            )
              .then((data) => {
                console.log(data._prebuiltEmptyResultObject);
                if (data.rowCount == 0) {
                  return next(data._prebuiltEmptyResultObject);
                }
                return next(data.rows[0]);
              })
              .catch((error) => next(error));
          }
        })
        .catch((error) => next(error));
    });
  };

  static getRelationship = (requesterId, receiverId) => {
    return new Promise((next) => {
      db.query(`SELECT "like", "block" FROM match WHERE id_requester = $1 AND id_receiver= $2 `, [requesterId, receiverId])
        .then((data) => {
          let relationShipData = {};
          if (data.rowCount > 0) {
            relationShipData.block = data.rows[0].block;
            if (!data.rows[0].block) {
              relationShipData.like = true;
            }
            return next(relationShipData);
          } else {
            db.query(`SELECT "like", "block" FROM match WHERE id_requester = $2 AND id_receiver= $1 `, [requesterId, receiverId])
              .then((data) => {
                if (data.rowCount > 0) {
                  relationShipData.block = data.rows[0].block;
                  if (!data.rows[0].block) {
                    relationShipData.like = data.rows[0].like;
                  }
                  console.log(relationShipData);
                  return next(relationShipData);
                }
              })
              .catch((error) => next(error));
          }
          // console.log("cc");
          // return next({});
        })
        .catch((error) => next(error));
    });
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

  static removeLike = (requesterId, receiverId) => {
    return new Promise((next) => {
      db.query(
        'SELECT "like" FROM match \
        WHERE id_requester = $1 AND id_receiver = $2\
        OR id_requester = $2 AND id_receiver = $1',
        [requesterId, receiverId]
      )
        .then((result) => {
          this.#updateElo(receiverId, requesterId, 0)
            .then(() => {
              if (result.rowCount > 0) {
                if (result.rows[0].like) {
                  db.query(
                    'UPDATE match SET "like" = false \
                  WHERE id_requester = $1 AND id_receiver = $2\
                  RETURNING *',
                    [requesterId, receiverId]
                  )
                    .then((result) => next(result))
                    .catch((error) => next(error));
                } else {
                  db.query(
                    "DELETE FROM match\
                    WHERE id_requester = $1 AND id_receiver = $2\
                    RETURNING *",
                    [requesterId, receiverId]
                  )
                    .then((result) => next(result))
                    .catch((error) => next(error));
                }
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
