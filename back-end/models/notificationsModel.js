const db = require("../db/db");

class NotificationsModel {
  static create = async (id_receiver, id_requester, action, type, view = false) => {
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
  static findByUserDetail = async (id_user, view = true) => {
    let query = `SELECT username, profile_picture,id_user_requester, type, action FROM notifications INNER JOIN users
        ON notifications.id_user_requester = users.id WHERE id_user_receiver = $1 `;
    let value = [id_user];
    return new Promise((next) => {
      db.query(query, value)
        .then((data) => next({ data: data.rows, number: data.rowCount }))
        .catch((error) => next(error));
    });
  };
  static findByUser = async (id_user, view = true) => {
    let query = "SELECT * FROM notifications WHERE id_user_receiver = $1 ";
    let value = [id_user];
    if (!view) {
      query = `SELECT * FROM notifications WHERE id_user_receiver = $1 AND "viewed" = $2`;
      value = [id_user, view];
    }
    return new Promise((next) => {
      db.query(query, value)
        .then((data) => next({ data: data.rows, number: data.rowCount }))
        .catch((error) => next(error));
    });
  };
  static findNotifByUserNoneSeen;
  static updateById = async (id, view = true) => {
    return new Promise((next) => {
      db.query(`UPDATE  notifications SET "viewed" = $1  WHERE  id_user_receiver = $2 RETURNING * `, [view, id])
        .then((data) => next(data.rows))
        .catch((error) => next(error));
    });
  };
}

module.exports = {
  NotificationsModel,
};
