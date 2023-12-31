const db = require("../db/db");

class MatchModel {
  static #updateElo(idPlayer, idOpponent, actual_outcome = 1) {
    const K = 32;
    const C = 400;
    return new Promise((next) => {
      db.query("SELECT rate_fame from users WHERE id = $1", [idPlayer])
        .then((userToUpdate) => {
          const currentUserRating = userToUpdate.rows[0].rate_fame;
          db.query("SELECT rate_fame from users WHERE id = $1", [idOpponent])
            .then((opponent) => {
              const opponentRating = opponent.rows[0].rate_fame;
              const qa = Math.pow(currentUserRating / C, 10);
              const qb = Math.pow(opponentRating / C, 10);
              const winnerOutcome = qa / (qa + qb);
              const loserOutcome = qb / (qb + qa);
              const opponentOutcome = actual_outcome === 1 ? 0 : 1;

              const playerRateFame = Math.ceil(
                currentUserRating + K * (actual_outcome - winnerOutcome),
              );

              const opponentRateFame = Math.ceil(
                opponentRating + K * (opponentOutcome - loserOutcome),
              );

              if (playerRateFame < 0) {
                playerRateFame = 0;
              }

              if (opponentRateFame < 0) {
                opponentRateFame = 0;
              }

              db.query(
                "UPDATE users SET \
                rate_fame = \
                CASE id\
                  WHEN $1 THEN CAST($2 AS INTEGER)\
                  WHEN $3 THEN CAST($4 AS INTEGER)\
                END\
                WHERE id IN ($1, $3)\
                RETURNING *",
                [idPlayer, playerRateFame, idOpponent, opponentRateFame],
              )
                .then((result) => next(result))
                .catch((error) => next(error));
            })
            .catch((error) => next(error));
        })
        .catch((error) => next(error));
    });
  }

  static #deleteMatch = (id_requester, id_receiver) => {
    return new Promise((next) => {
      db.query(
        "DELETE FROM match where id_requester = $1 AND id_receiver = $2 OR   id_requester = $2 AND id_receiver = $1",
        [id_requester, id_receiver],
      )
        .then((data) => {
          return next(data);
        })
        .catch((error) => next(error));
    });
  };

  static update(id_requester, id_receiver, like, block) {
    return new Promise((next) => {
      db.query(
        `UPDATE match SET block = $1, like= $2 WHERE id_requester = $3 AND id_receiver = $4 OR id_requester = $4 AND id_receiver = $3 RETURNING * `,
        [block, like, id_requester, id_receiver],
      )
        .then((data) => {
          next(data);
        })
        .catch((error) => next(error));
    });
  }

  static getRelationShip = async (requesterId, receiverId) => {
    try {
      const responseReceiverBlockUser = await db.query(
        `SELECT "blocked" from block WHERE id_receiver = $2 AND id_requester = $1`,
        [receiverId, requesterId],
      );
      let isUserblockedRequester = false;
      if (responseReceiverBlockUser.rowCount > 0) {
        isUserblockedRequester = responseReceiverBlockUser.rows[0].blocked;
      }
      const isblocked = await db.query(
        `SELECT "blocked" from block WHERE id_receiver = $1 AND id_requester = $2`,
        [receiverId, requesterId],
      );
      let blocked = false;
      if (isblocked.rowCount > 0) {
        blocked = isblocked.rows[0].blocked;
      }
      const responseRequester = await db.query(
        'SELECT  match.id_requester, match."like" FROM match  WHERE match.id_requester = $1 AND match.id_receiver= $2 ',
        [requesterId, receiverId],
      );
      if (responseRequester.rowCount > 0) {
        const obj = JSON.parse(JSON.stringify(responseRequester.rows[0]));

        if (responseRequester.rows[0].like) {
          obj.match = true;
        }
        if (!responseRequester.rows[0].like) {
          obj.like = true;
        }
        obj.blocked = blocked;
        obj.isReceiverBlockRequester = isUserblockedRequester;
        return obj;
      } else {
        const responseReceiver = await db.query(
          'SELECT  match.id_requester, match."like" FROM match  WHERE match.id_requester = $2 AND match.id_receiver= $1 ',
          [requesterId, receiverId],
        );
        if (responseReceiver.rowCount == 1) {
          const obj = JSON.parse(JSON.stringify(responseReceiver.rows[0]));
          if (responseReceiver.rows[0].like) {
            obj.match = true;
          } else {
            obj.userLike = true;
          }
          obj.blocked = blocked;
          obj.isReceiverBlockRequester = isUserblockedRequester;
          return obj;
        } else {
          return {
            like: false,
            blocked: blocked,
            isReceiverBlockRequester: isUserblockedRequester,
          };
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
      db.query(
        'select "like", id_requester, id_receiver from match \
        where id_requester = $1 and id_receiver = $2\
        OR id_requester = $2 AND id_receiver = $1',
        [requesterId, receiverId],
      )
        .then((result) => {
          this.#updateElo(receiverId, requesterId, 1)
            .then(() => {
              if (!result.rowCount) {
                db.query(
                  'INSERT INTO match("like", block, id_requester, id_receiver)  \
                VALUES(false, false, $1, $2) RETURNING *',
                  [requesterId, receiverId],
                )
                  .then((result) => next(result))
                  .catch((error) => next(error));
              } else {
                db.query(
                  'UPDATE match SET "like" = true \
                WHERE id_requester = $1 AND id_receiver = $2\
                OR id_requester = $2 AND id_receiver = $1\
                RETURNING *',
                  [receiverId, requesterId],
                )
                  .then(() => {
                    db.query(
                      "SELECT id_user_1 FROM conversations WHERE id_user_1 = $1",
                      [requesterId],
                    )
                      .then((result) => {
                        if (result.rowCount === 0) {
                          db.query(
                            "INSERT INTO conversations(id_user_1, id_user_2)\
                              VALUES ($1, $2)\
                              ON CONFLICT \
                              DO NOTHING \
                              RETURNING *",
                            [receiverId, requesterId],
                          )
                            .then((result) => next(result))
                            .catch((error) => next(error));
                        }
                        next(result);
                      })
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
   * @returns {Promise}
   **/

  static removeLike = (requesterId, receiverId) => {
    return new Promise((next) => {
      db.query(
        'select "like", id_requester, id_receiver from match \
        where id_requester = $1 and id_receiver = $2\
        OR id_requester = $2 AND id_receiver = $1',
        [requesterId, receiverId],
      )
        .then((result) => {
          if (result.rowCount > 0) {
            if (result.rows[0].like) {
              const { id_requester, id_receiver } = result.rows[0];
              if (
                (id_requester == requesterId && id_receiver == receiverId) ||
                (id_requester == receiverId && id_receiver == requesterId)
              ) {
                db.query(
                  'UPDATE match\
                        SET "like" = false,\
                        id_receiver = $1,\
                        id_requester = $2',
                  [requesterId, receiverId],
                )
                  .then((result) => next(result))
                  .catch((error) => next(error));
              } else {
                db.query(
                  'UPDATE match SET "like" = false \
                    WHERE id_requester = $1 AND id_receiver = $2\
                    RETURNING *',
                  [requesterId, receiverId],
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
                [requesterId, receiverId],
              )
                .then((result) => next(result))
                .catch((error) => next(error));
            }
          } else {
            next(result);
          }
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
        await this.#deleteMatch(requesterId, receiverId);
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
