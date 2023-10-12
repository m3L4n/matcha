const { PBKDF2 } = require("crypto-js");
const db = require("../db/db");
const { distanceBetweenTwoPoints } = require("../modules/distance");
const { filterValidation, sortValidation } = require("../modules/formValidation");
const { error } = require("../modules/response");

class UserModel {
  static createUser = async (userData) => {
    const { id, username, firstName, lastName, email, password, valided } = userData;
    const query = "INSERT INTO users (id, username, firstName, lastName, email, password, valided) VALUES  ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (username, email) DO NOTHING;";
    const values = [id, username, firstName, lastName, email, password, valided];
    return new Promise((next) => {
      db.query(query, values)
        .then((data) => {
          if (data.rowCount == 0) {
            const error = new Error("email or username Already Exists!");
            error.status = 23505;
            next(error);
          }
          next(data);
        })
        .catch((err) => {
          const error = new Error("Something wents wrong!");
          error.status = 500;
          next(error);
        });
    });
  };
  // try {
  //   const newUser = await db.query(query, values);
  //   return newUser;
  // } catch (err) {
  //   }
  // }

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
   * @param {Object} filterParams
   **/
  static getAll = (currentUserId, filterParams, sortParams) => {
    // TODO implement TAGS for matching/filter/sort
    const ELO_DIFFERENCE = 300;
    const AGE_DIFFERENCE = 10;
    const MAX_DISTANCE = filterParams.action == "filter" ? selectionParams.location || 300 : 300;
    return new Promise((next) => {
      db.query("SELECT sexual_preference, rate_fame, position, age FROM users WHERE id = $1", [currentUserId])
        .then((result) => {
          const filterError = filterValidation(filterParams);
          const sortError = sortValidation(sortParams);
          if (filterError !== "ok") {
            next(filterError);
          }
          if (sortError !== "ok") {
            next(sortError);
          }
          const { sexual_preference, rate_fame, position, age } = result.rows[0];
          let min_fame = rate_fame - ELO_DIFFERENCE;
          let max_fame = rate_fame + ELO_DIFFERENCE;
          let min_age = age - AGE_DIFFERENCE < 18 ? 18 : age - AGE_DIFFERENCE;
          let max_age = age + AGE_DIFFERENCE;
          const selectionAge = Number(filterParams.age) ?? 10;
          const selectionFame = Number(filterParams.fame) ?? 300;

          if (filterParams.action == "filter") {
            min_fame = rate_fame - selectionFame;
            max_fame = rate_fame + selectionFame;
            min_age = age - selectionAge < 18 ? 18 : age - selectionAge;
            max_age = age + selectionAge;
          }

          const getMatchesBySexualPreferences = () => {
            return db.query(
              "SELECT id, username, position, profile_picture, age FROM users \
                WHERE gender = $1 AND rate_fame BETWEEN $2 AND $3 AND age BETWEEN $4 AND $5 \
                AND id != $6",
              [sexual_preference, min_fame, max_fame, min_age, Number(max_age), currentUserId]
            );
          };

          const getMatchesOfAllSexes = () => {
            return db.query(
              "SELECT id, username, position, profile_picture, age FROM users \
                WHERE rate_fame BETWEEN $1 AND $2 AND age BETWEEN $3 AND id IS NOT $4",
              [min_fame, max_fame, min_age, Number(max_age)]
            );
          };

          const getOnlyClosePeople = (users) => {
            return users.filter((user) => Math.floor(distanceBetweenTwoPoints(position, user.position) < MAX_DISTANCE));
          };

          const sortMatches = (users, age) => {
            let usersSorted = users;
            if (sortParams.ageSort) {
              if (sortParams.ageSort == "ascending") {
                usersSorted = users.sort((a, b) => a.age - age - (b.age - age));
                console.log(usersSorted);
              } else {
                usersSorted = users.sort((a, b) => b.age - age - (a.age - age));
              }
            }
            if (filterParams.fame) {
              if (sortParams.ageSort == "ascending") usersSorted = users.sort((a, b) => a.rate_fame - rate_fame - (b.rate_fame - rate_fame));
              else usersSorted = users.sort((a, b) => b.rate_fame - rate_fame - (a.rate_fame - rate_fame));
            }
            if (filterParams.location) {
              if (sortParams.locationSort == "ascending") {
                usersSorted = users.sort((a, b) => distanceBetweenTwoPoints(position, a.position) - distanceBetweenTwoPoints(position, b.position));
              } else {
                usersSorted = users.sort((a, b) => distanceBetweenTwoPoints(position, b.position) - distanceBetweenTwoPoints(position, a.position));
              }
            }
            return usersSorted;
          };

          if (sexual_preference !== "both") {
            getMatchesBySexualPreferences()
              .then((result) => next(sortMatches(getOnlyClosePeople(result.rows), age)))
              .catch((err) => next(err));
          } else {
            getMatchesOfAllSexes()
              .then((result) => next(sortMatches(getOnlyClosePeople(result.rows), age)))
              .catch((err) => next(err));
          }
        })
        .catch((err) => next(err));
    });
  };
  static getAllEnum = async () => {
    let enumGender = [];
    let enumTags = [];
    let enumSexualPreference = [];
    let enumBeverage = [];
    let enumLength = 0;
    try {
      enumTags = await db.query("SELECT enum_range(NULL::tags_enum) as tags");
      enumTags = enumTags.rows[0].tags;
      enumLength = enumTags.length;
      if (enumLength > 2) {
        enumTags = enumTags.substr(1, enumLength - 2).split(",");
      }
      enumGender = await db.query("SELECT enum_range(NULL::gender_enum) as gender");
      enumGender = enumGender.rows[0].gender;
      enumLength = enumGender.length;
      if (enumLength > 2) {
        enumGender = enumGender.substr(1, enumLength - 2).split(",");
      }
      enumSexualPreference = await db.query("SELECT enum_range(NULL::sexual_preference_enum) as spref");
      enumSexualPreference = enumSexualPreference.rows[0].spref;
      enumLength = enumSexualPreference.length;
      if (enumLength > 2) {
        enumSexualPreference = enumSexualPreference.substr(1, enumLength - 2).split(",");
      }
      enumBeverage = await db.query("SELECT enum_range(NULL::beverage_enum) as beverage");
      enumBeverage = enumBeverage.rows[0].beverage;
      enumLength = enumBeverage.length;
      if (enumLength > 2) {
        enumBeverage = enumBeverage.substr(1, enumLength - 2).split(",");
      }
      return { enumGender, enumTags, enumBeverage, enumSexualPreference };
    } catch (error) {
      console.log(error);
      throw error;
    }
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

  static getAllInformationUser = async (id, idRequester) => {
    let query = "";
    if (id === idRequester) {
      query =
        "SELECT id, username, email, firstName, gender, beverage, sexual_preference, lastName, tags, description, age, rate_fame, city, position, connected, profile_picture, pictures FROM users WHERE id = $1";
      // query =
      // "SELECT id, username, email, firstName, gender, beverage,sexual_preference, lastName, (SELECT array_agg(unnest(tags)) FROM users WHERE id = $1) AS tags, description,  age, rate_fame, city, position, connected, profile_picture , pictures FROM users WHERE id = $1";
    } else {
      query =
        "SELECT id, username, firstName, gender, beverage,sexual_preference, lastName, tags, description,  age, rate_fame, city, position, connected, profile_picture , pictures FROM users WHERE id = $1";
    }
    return new Promise((next) => {
      db.query(query, [id])
        .then((data) => {
          if (data.rowCount == 0) {
            next(new Error("no data here"));
          }
          next(data.rows[0]);
        })
        .catch((err) => next(err));
    });
  };
}

module.exports = {
  UserModel,
};
