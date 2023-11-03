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

  static getRelationShip = async (requesterId, receiverId) => {
    try {
      const responseRequester = await db.query(
        'SELECT  block."blocked", match.id_requester, match."like" FROM match FULL JOIN block  ON match.id_requester = block.id_requester  WHERE match.id_requester = $1 AND match.id_receiver= $2 ',
        [requesterId, receiverId]
      );
      if (responseRequester.rowCount > 0) {
        const obj = responseRequester.rows[0];
        if (!responseRequester.rows[0].like) {
          obj.like = true;
        }
        return obj;
      } else {
        const responseReceiver = await db.query(
          'SELECT  block."blocked", match.id_requester, match."like" FROM match FULL JOIN block  ON match.id_requester = block.id_requester  WHERE match.id_requester = $2 AND match.id_receiver= $1 ',
          [requesterId, receiverId]
        );
        if (responseReceiver.rowCount == 1) {
          return responseReceiver.rows[0];
        } else {
          const blockRequester = await db.query(`SELECT "blocked" FROM block WHERE id_requester = $1 AND id_receiver = $2`, [requesterId, receiverId]);
          if (blockRequester.rowCount == 0) {
            return { like: false, blocked: false };
          } else {
            return { like: false, blocked: blockRequester.rows[0].blocked };
          }
        }
      }
    } catch (error) {
      return error;
    }
  };

  /**
   * Create a like
   * @param {string} receiverId
   * @param {string} requesterId
   * @returns {Promise}
   **/

  static createLike = (requesterId, receiverId) => {
    return new Promise((next) => {
      console.log(`RequesterId: ${requesterId}`);
      db.query(
        'select "like", id_requester, id_receiver from match \
        where id_requester = $1 and id_receiver = $2\
        OR id_requester = $2 AND id_receiver = $1',
        [requesterId, receiverId]
      )
        .then((result) => {
          this.#updateElo(receiverId, requesterId, 1)
            .then(() => {
              if (!result.rowCount) {
                console.log("On trouve pas frr");
                db.query(
                  'INSERT INTO match("like", block, id_requester, id_receiver)  \
                VALUES(false, false, $1, $2)',
                  [requesterId, receiverId]
                )
                  .then((result) => next(result))
                  .catch((error) => next(error));
              } else {
                console.log("On trouve frrr");
                db.query(
                  'UPDATE match SET "like" = true \
                WHERE id_requester = $1 AND id_receiver = $2\
                OR id_requester = $2 AND id_receiver = $1',
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
        'select "like", id_requester, id_receiver from match \
        where id_requester = $1 and id_receiver = $2\
        OR id_requester = $2 AND id_receiver = $1',
        [requesterId, receiverId]
      )
        .then((result) => {
          this.#updateElo(receiverId, requesterId, 0)
            .then(() => {
              if (result.rowCount > 0) {
                if (result.rows[0].like) {
                  const { id_requester, id_receiver } = result.rows[0];
                  if (id_requester == receiverId && id_receiver == requesterId) {
                    db.query(
                      'UPDATE match\
                        SET "like" = false,\
                        id_receiver = $1,\
                        id_requester = $2',
                      [receiverId, requesterId]
                    )
                      .then((result) => next(result))
                      .catch((error) => next(error));
                  } else {
                    db.query(
                      'UPDATE match SET "like" = false \
                    WHERE id_requester = $1 AND id_receiver = $2\
                    RETURNING *',
                      [requesterId, receiverId]
                    )
                      .then((result) => next(result))
                      .catch((error) => next(error));
                  }
                } else {
                  db.query(
                    "DELETE FROM match\
                    WHERE id_requester = $1 AND id_receiver = $2\
                    OR id_receiver = $1 AND id_requester = $2\
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
  static blockUser = async (requesterId, receiverId, block = true) => {
    try {
      if (block) {
        return await this.#updateElo(receiverId, requesterId, 0);
      } else {
        return await this.#updateElo(receiverId, requesterId, 1);
      }
    } catch (error) {
      throw new Error("cant update elo for the user");
    }
  };
}

module.exports = {
  MatchModel,
};
