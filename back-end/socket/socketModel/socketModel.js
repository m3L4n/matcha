const db = require("../../db/db");

class socketModel {
  static create = (idSocket, idUser) => {
    return new Promise((next) => {
      db.query("INSERT INTO socket (id_socket, id_user) VALUES ($1, $2) ON CONFLICT (id_user)DO UPDATE SET id_socket = EXCLUDED.id_socket", [idSocket, idUser])
        .then((data) => {
          return next(data);
        })
        .catch((error) => next(error));
    });
  };

  static deletebyUserId = (idUser) => {
    return new Promise((next) => {
      db.query("DELETE FROM socket where id_user = $1", [idUser])
        .then((data) => next(data))
        .catch((error) => next(error));
    });
  };
  static deletebySocketId = (idSocket) => {
    return new Promise((next) => {
      db.query("DELETE FROM socket where id_socket = $1", [idSocket])
        .then((data) => next(data))
        .catch((error) => next(error));
    });
  };
  static findByIdUser = (idUser) => {
    return new Promise((next) => {
      db.query("SELECT id_socket, id_user FROM socket WHERE id_user = $1", [idUser])
        .then((data) => next(data.rows[0]))
        .catch((error) => next(error));
    });
  };
  static findByIdsocket = (idSocket) => {
    return new Promise((next) => {
      db.query("SELECT id_socket, id_user FROM socket WHERE id_socket = $1", [idSocket])
        .then((data) => next(data.rows[0]))
        .catch((error) => next(error));
    });
  };
}

module.exports = {
  socketModel,
};
