const db = require("../db/db");
const { error } = require("../modules/response");

class TagsModel {
  static getAll = () => {
    const query = "SELECT tag_name FROM tags";
    return new Promise((next) => {
      db.query(query)
        .then((data) => {
          if (data.rowCount == 0) {
            throw new Error("zero enum");
          }
          return next(data.rows);
        })
        .catch((error) => {
          return next(error);
        });
    });
  };
}

module.exports = {
  TagsModel,
};
