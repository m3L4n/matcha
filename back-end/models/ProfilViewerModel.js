const db = require("../db/db");

class ProfilViewerModel {
  static create = (id_requester, id_watched) => {
    return new Promise((next) => {
      db.query("INSERT INTO profilViewer (id_watcher, id_watched) VALUES ($1, $2)", [id_requester, id_watched])
        .then((data) => {
          return next(data.rows[0]);
        })
        .catch((error) => next(error));
    });
  };
  static getAll = (id_requester) => {
    return new Promise((next) => {
      db.query("SELECT username, profile_picture, id_watched FROM profilViewer INNER JOIN users ON profilViewer.id_watched = users.id WHERE id_watcher = $1 ", [id_requester])
        .then((data) => {
          return next(data.rows);
        })
        .catch((error) => next(error));
    });
  };
}
module.exports = {
  ProfilViewerModel,
};
