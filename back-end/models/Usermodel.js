const db = require("../db/db");
const { distanceBetweenTwoPoints } = require("../modules/distance");
const { searchValidation } = require("../modules/formValidation");
const { error } = require("../modules/response");

class UserModel {
  static createUser = async (userData) => {
    try {
      const { id, username, firstName, lastName, email, password, valided } = userData;
      const query = "INSERT INTO users (id, username, firstName, lastName, email, password, valided) VALUES  ($1, $2, $3, $4, $5, $6, $7)";
      const values = [id, username, firstName, lastName, email, password, valided];
      const newUser = await db.query(query, values);
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  static findbyId = async (paramToSearch, valueToCompare) => {
    try {
      const query = `SELECT *  FROM users WHERE ${paramToSearch} = $1`;
      const user = await db.query(query, [valueToCompare]);
      if (user.rowCount == 0) {
        throw new Error("users doesnt exist");
      }
      return user.rows[0];
    } catch (error) {
      throw error;
    }
  };

  static findbyIwithouthPassword = async (paramToSearch, valueToCompare) => {
    try {
      const query = `SELECT id, username, email, firstName, lastName, gender, beverage, sexual_preference, description, rate_fame, position , profile_picture, pictures, valided FROM users WHERE ${paramToSearch} = $1`;
      const user = await db.query(query, [valueToCompare]);
      if (user.rowCount == 0) {
        throw new Error("users doesnt exist");
      }
      return user.rows[0];
    } catch (error) {
      throw error;
    }
  };

  /** */
  static update = async (userId, paramToUpdate, valueToChange) => {
    try {
      const query = `UPDATE users SET ${paramToUpdate} = $1 WHERE id = $2`;
      const values = [valueToChange, userId];
      const updatedUser = await db.query(query, values);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };
  static uploadImageInDB = async (param, buffer, userId) => {
    return new Promise((next) => {
      const query = `UPDATE users SET ${param} = $1 WHERE id = $2`;
      const values = [buffer, userId];
      db.query(query, values)
        .then((data) => {
          if (data.rowCount == 0) {
            throw new Error("users doesnt exist");
          }
          next(data.rows[0]);
        })
        .catch((error) => (err) => next(err));
    });
  };
  /**
   * Get all potential match for current user
   * @param {string} currentUserId
   * @param {Object} searchParams
   **/
  static getAll = (currentUserId, searchParams) => {
    // TODO implement TAGS for matching / search
    const ELO_DIFFERENCE = 300;
    const AGE_DIFFERENCE = 10;
    return new Promise((next) => {
      db.query("SELECT sexual_preference, rate_fame, position, age FROM users WHERE id = $1", [currentUserId])
        .then((result) => {
          const { sexual_preference, rate_fame, position, age } = result.rows[0];
          let min_fame = rate_fame - ELO_DIFFERENCE;
          let max_fame = rate_fame + ELO_DIFFERENCE;
          let min_age = age - AGE_DIFFERENCE < 18 ? 18 : age - AGE_DIFFERENCE;
          let max_age = age + AGE_DIFFERENCE;
          let max_distance = 300;

          const validatedSearchCriteria = searchValidation(searchParams);
          if (validatedSearchCriteria !== "ok") {
            return next(validatedSearchCriteria);
          }

          if (searchParams.action === "search") {
            if (searchParams.age !== "") {
              min_age = age - parseInt(searchParams.age);
              if (min_age < 18) {
                min_age = 18;
              }
              max_age = age + parseInt(searchParams.age);
            } else {
              min_age = 18;
              max_age = 2042;
            }
            if (searchParams.location !== "") {
              max_distance = parseInt(searchParams.location);
            } else {
              max_distance = 20010;
            }
            if (searchParams.fame !== "") {
              min_fame = rate_fame - parseInt(searchParams.fame);
              max_fame = rate_fame + parseInt(searchParams.fame);
            } else {
              min_fame = 0;
              max_fame = 42000;
            }
          }

          const getMatchesBySexualPreferences = () => {
            return db.query(
              "SELECT id, username, position, profile_picture, age, rate_fame FROM users \
                WHERE gender = $1 AND rate_fame BETWEEN $2 AND $3 AND age BETWEEN $4 AND $5 \
                AND id != $6",
              [sexual_preference, min_fame, max_fame, min_age, max_age, currentUserId]
            );
          };

          const getMatchesOfAllSexes = () => {
            return db.query(
              "SELECT id, username, position, profile_picture, age, rate_fame FROM users \
                WHERE rate_fame BETWEEN $1 AND $2 AND age BETWEEN $3 AND $4 AND id != $5",
              [min_fame, max_fame, min_age, Number(max_age), currentUserId]
            );
          };

          const getOnlyClosePeople = (users) => {
            return users.filter((user) => Math.floor(distanceBetweenTwoPoints(position, user.position) < max_distance));
          };

          if (sexual_preference !== "other" || searchParams.action === "search") {
            getMatchesBySexualPreferences()
              .then((result) => next(getOnlyClosePeople(result.rows)))
              .catch((err) => next(err));
          } else {
            getMatchesOfAllSexes()
              .then((result) => next(getOnlyClosePeople(result.rows)))
              .catch((err) => next(err));
          }
        })
        .catch((err) => next(err));
    });
  };
  static updateAllInformation = async ({ firstname, gender, age, email, lastname, sexual_preference, tags, beverage, description, position, city, id }) => {
    const query = `UPDATE users SET firstname = $1, lastname = $2, gender = $3, email = $4, sexual_preference = $5, tags = $6, age = $7, beverage = $8, description = $9, position = POINT($10,$11), city = $12 WHERE id = $13`;
    const values = [firstname, lastname, gender, email, sexual_preference, tags, age, beverage, description, position.x, position.y, city, id];
    return new Promise((next) => {
      db.query(query, values)
        .then((data) => {
          if (data.rowCount == 0) {
            next(new Error("no data here"));
          }
          next(data.rows[0]);
        })
        .catch((err) => next(err));
    });
  };

  static getAllInformationUser = async (id, idReceiver) => {
    let query = "";
    if (id === idReceiver) {
      query =
        "SELECT id, username, email, firstName, gender, beverage, sexual_preference, lastName, tags, description, age, rate_fame, city, position, connected, latest_connection,  profile_picture, fake_account,  pictures FROM users WHERE id = $1";
    } else {
      query =
        "SELECT id, username, firstName, gender, beverage,sexual_preference, lastName, tags, description,  age, rate_fame, city, position, connected, profile_picture , latest_connection, fake_account,  pictures FROM users WHERE id = $1";
    }
    return new Promise((next) => {
      db.query(query, [idReceiver])
        .then((data) => {
          if (data.rowCount == 0) {
            next(new Error("no data here"));
          }
          next(data.rows[0]);
        })
        .catch((err) => next(err));
    });
  };
  static reportAsFakeAccount = (idReceiver) => {
    return new Promise((next) => {
      db.query(`UPDATE users SET fake_account = fake_account + 1 WHERE id = $1`, [idReceiver])
        .then((data) => {
          return next(data);
        })
        .catch((error) => next(error));
    });
  };
  static handleConnected = (idUser, connected) => {
    return new Promise((next) => {
      db.query('UPDATE users set "connected" = $1 , latest_connection = NOW()::timestamp WHERE id = $2', [connected, idUser])
        .then((data) => next(data))
        .catch((error) => next(error));
    });
  };
  static isUserConnected = (idUser) => {
    return new Promise((next) => {
      db.query("SELECT connected FROM users WHERE id = $1", [idUser])
        .then((data) => next(data.rows[0]))
        .catch((error) => next(error));
    });
  };
}

module.exports = {
  UserModel,
};
