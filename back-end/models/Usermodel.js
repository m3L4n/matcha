const db = require("../db/db");
const { distanceBetweenTwoPoints } = require("../modules/distance");
const { searchValidation } = require("../modules/formValidation");

class UserModel {
  static createUser = async (userData) => {
    try {
      const { id, username, firstName, lastName, email, password, valided } = userData;
      const query = "INSERT INTO users (id, username, firstName, lastName, email, password, valided) VALUES  ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (username, email) DO NOTHING RETURNING *;";
      const values = [id, username, firstName, lastName, email, password, valided];
      const newUser = await db.query(query, values);
      if (newUser.rowCount == 0) {
        const error = new Error();
        error.status = 400;
        error.msg = "same key in the db , please change username or email, or reconnecte you ";
        throw error;
      }
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  static findbyId = async (paramToSearch, valueToCompare) => {
    try {
      const query = `SELECT * FROM users WHERE ${paramToSearch} = $1`;
      const user = await db.query(query, [valueToCompare]);
      if (user.rowCount == 0) {
        throw new Error("users doesnt exist");
      }
      return user.rows[0];
    } catch (error) {
      throw error;
    }
  };

  static findUniqueKey = async (param, value) => {
    try {
      const query = `SELECT * FROM users WHERE ${param} = $1`;
      const user = await db.query(query, [value]);
      if (user.rowCount == 0) {
        throw "no user";
      }
      return user.rows[0];
    } catch (err) {
      throw err;
    }
  };
  static FindUniqueEmailNotOur = async (id, email) => {
    try {
      const query = `SELECT email FROM users WHERE  email = $1 AND NOT id = $2`;
      const emailData = await db.query(query, [email, id]);
      if (emailData.rowCount == 0) {
        throw "no email found";
      }
      return emailData.rows[0];
    } catch (err) {
      throw err;
    }
  };
  static findbyIwithouthPassword = async (paramToSearch, valueToCompare) => {
    try {
      const query = `SELECT id, username, email, firstName, lastName, gender, beverage, sexual_preference, description, rate_fame, position , profile_picture, pictures, valided, age FROM users WHERE ${paramToSearch} = $1`;
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
      const query = `UPDATE users SET ${param} = $1 WHERE id = $2 RETURNING *`;
      const values = [buffer, userId];
      db.query(query, values)
        .then((data) => {
          if (data.rowCount == 0) {
            throw new Error("users doesnt exist");
          }
          next(data.rows[0]);
        })
        .catch((error) => next(error));
    });
  };
  /**
   * Get all potential match for current user
   * @param {string} currentUserId
   * @param {Object} searchParams
   **/
  static getAll = (currentUserId, searchParams) => {
    const ELO_DIFFERENCE = 300;
    const AGE_DIFFERENCE = 10;
    return new Promise((next) => {
      db.query("SELECT sexual_preference, rate_fame, position, age, tags FROM users WHERE id = $1", [currentUserId])
        .then((result) => {
          const { sexual_preference, rate_fame, position, age, tags } = result.rows[0];
          let min_fame = rate_fame - ELO_DIFFERENCE;
          let max_fame = rate_fame + ELO_DIFFERENCE;
          let min_age = age - AGE_DIFFERENCE < 18 ? 18 : age - AGE_DIFFERENCE;
          let max_age = age + AGE_DIFFERENCE;
          let max_distance = 200;
          let tagsRequired = tags;

          const validatedSearchCriteria = searchValidation(searchParams);
          if (validatedSearchCriteria !== "ok") {
            throw new Error(validatedSearchCriteria);
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
            if (searchParams.tags !== "") {
              tagsRequired = searchParams.tags.split(",").filter((tag) => tag.length > 0);
            }
          }

          const getMatchesBySexualPreferences = () => {
            return db.query(
              "SELECT u.id, u.username, u.position, u.profile_picture, u.age, u.rate_fame, u.city, u.tags,\
              array_cat(u.tags, $7) common_tags\
              FROM users u\
                WHERE u.gender = $1\
                AND u.rate_fame BETWEEN $2 AND $3\
                AND u.age BETWEEN $4 AND $5\
                AND u.id != $6\
                AND u.id NOT IN (\
                  SELECT b.id_receiver\
                  FROM block b\
                  WHERE b.id_receiver = u.id AND b.blocked = true\
                )\
                AND u.id NOT IN (\
                  SELECT m.id_receiver\
                  FROM match m\
                  WHERE m.id_requester = $6)\
                AND u.id NOT IN(\
                  SELECT m.id_requester\
                  FROM match m\
                  WHERE m.id_receiver = $6\
                  AND m.like = true)",
              [sexual_preference, min_fame, max_fame, min_age, max_age, currentUserId, tags]
            );
          };

          const getMatchesOfAllSexes = () => {
            let query =
              "SELECT u.id, u.username, u.position, u.profile_picture, u.age, u.rate_fame, u.city, u.tags,\
              array_cat(u.tags, $6) common_tags\
              FROM users u\
                WHERE u.rate_fame BETWEEN $1 AND $2\
                AND u.age BETWEEN $3 AND $4\
                AND u.id != $5\
                AND u.id NOT IN (\
                  SELECT m.id_receiver\
                  FROM match m\
                  WHERE m.id_requester = $5)\
                AND u.id NOT IN(\
                  SELECT m.id_requester\
                  FROM match m\
                  WHERE m.id_receiver = $5\
                  AND m.like = true)\
                  AND $7::text[] <@ $6::text[]";
            return db.query(query, [min_fame, max_fame, min_age, max_age, currentUserId, tags, tagsRequired]);
          };

          const getOnlyClosePeople = (users) => {
            return users
              .filter((user) => Math.floor(distanceBetweenTwoPoints(position, user.position) < max_distance))
              .sort((a, b) => distanceBetweenTwoPoints(a.position, position) - distanceBetweenTwoPoints(b.position, position));
          };

          if (sexual_preference === "both" || searchParams.action === "search") {
            getMatchesOfAllSexes()
              .then((result) => next(getOnlyClosePeople(result.rows)))
              .catch((err) => next(err));
          } else {
            getMatchesBySexualPreferences()
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
  static handleDisconnected = (idUser, connected) => {
    return new Promise((next) => {
      db.query('UPDATE users set "connected" = false  WHERE id = $1 RETURNING *', [idUser])
        .then((data) => {
          return next(data.rows);
        })
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
