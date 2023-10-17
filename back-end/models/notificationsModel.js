const db = require("../db/db");

class notificationsModel {
  static create = async ({ id_receiver, id_requester, action, type, view = false }) => {
    return new Promise((next) => {
      db.query(`INSERT INTO notifications (id_user_requester, id_user_receiver, action, type, "viewed") VALUES ($1 , $2, $3, $4, $5)`, [id_requester, id_receiver, action, type, view])
        .then((data) => {
          return next(data.rows[0]);
        })
        .catch((error) => next(error));
    });
  };
  static findById = async (id) => {
    return new Promise((next) => {
      db.query("SELECT * FROM notifications WHERE id = $1", [id])
        .then((data) => next(data.rows[0]))
        .catch((err) => next(err));
    });
  };
  static findByUser = async (id_user, view = true) => {
    let query = "SLECT * FROM notifications WHERE id_user_receiver = $1 ";
    let value = [id_user];
    if (!view) {
      query = `SLECT * FROM notifications WHERE id_user_receiver = $1 AND "view" = $2`;
      value = [id_user, view];
    }
    return new Promise((next) => {
      db.query(query, value)
        .then((data) => next(data.rows[0]))
        .catch((error) => next(error));
    });
  };
  static findNotifByUserNoneSeen;
  static updateById = async (id, view = true) => {
    return new Promise((next) => {
      db.query(`UPDATE  notifications SET "view" = $1  WHERE  id= $2 `, [view, id])
        .then((data) => next(data.rows[0]))
        .catch((error) => next(error));
    });
  };
}

module.exports = {
  notificationsModel,
};
