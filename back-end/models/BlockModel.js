const db = require("../db/db");

class BlockModel {
  static update = (id_receiver, id_requester, block) => {
    return new Promise((next) => {
      db.query(`SELECt id, "blocked" from block WHERE id_requester = $1 AND id_receiver = $2`, [id_requester, id_receiver])
        .then((data) => {
          if (data.rowCount == 0) {
            db.query(`INSERT INTO block (id_requester, id_receiver, "blocked") VALUES ($1, $2, $3) RETURNING *`, [id_requester, id_receiver, block])
              .then((data) => {
                return next(data.rows[0]);
              })
              .catch((error) => next(error));
          } else {
            const { id } = data.rows[0];
            db.query(`UPDATE block SET "blocked" = $1 WHERE id = $2 RETURNING *`, [block, id])
              .then((data) => next(data.rows[0]))
              .catch((error) => next(error));
          }
        })
        .catch((error) => next(error));
    });
  };
}
module.exports = {
  BlockModel,
};
