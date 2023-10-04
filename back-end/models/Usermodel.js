const { PBKDF2 } = require("crypto-js");
const db = require("../db/db");
const { distanceBetweenTwoPoints } = require('../modules/distance');
const { filterValidation, sortValidation } = require('../modules/formValidation');

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
      return user.rows[0];
    } catch (error) {
      throw error;
    }
  };

  static findbyIwithouthPassword = async (paramToSearch, valueToCompare) => {
    try {
      const query = `SELECT username, email, firstName, lastName, gender, beverage, sexual_preference, description, rate_fame, position , profile_picture, valided FROM users WHERE ${paramToSearch} = $1`;
      const user = await db.query(query, [valueToCompare]);
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

  /**
    * Get all potential match for current user
    * @param {string} currentUserId
    * @param {Object} filterParams
  **/
  static getAll = (currentUserId, filterParams) => {
    // TODO implement TAGS for matching/filter/sort
    const ELO_DIFFERENCE = 300;
    const AGE_DIFFERENCE = 10;
    const MAX_DISTANCE = filterParams.action == "filter" ? filterParams.location || 300 : 300;
    return new Promise((next) => {
      db.query("SELECT sexual_preference, rate_fame, position, age FROM users WHERE id = $1", [currentUserId])
        .then((result) => {
          const filterError = filterValidation(filterParams);
          if (filterError !== "ok") {
            next(filterError);
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
            )
          }

          const getMatchesOfAllSexes = () => {
            return db.query(
              "SELECT id, username, position, profile_picture, age FROM users \
                WHERE rate_fame BETWEEN $1 AND $2 AND age BETWEEN $3 AND id IS NOT $4",
              [min_fame, max_fame, min_age, Number(max_age)]
            )
          }

          const getOnlyClosePeople = (users) => {
            return users.filter(user => Math.floor(distanceBetweenTwoPoints(position, user.position) < MAX_DISTANCE));
          }

          if (sexual_preference !== "both") {
            getMatchesBySexualPreferences()
              .then(result => next(getOnlyClosePeople(result.rows)))
              .catch((err) => next(err));
          } else {
            getMatchesOfAllSexes()
              .then(result => next(getOnlyClosePeople(result.rows)))
              .catch((err) => next(err));
          }
        })
        .catch((err) => next(err));
    });
  };
}

module.exports = {
  UserModel,
};
