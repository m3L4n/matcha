const { PBKDF2 } = require("crypto-js");
const db = require("../db/db");

class UserModel {
  static createUser = async (userData) => {
    try {
      const { id, username, firstName, lastName, email, password, valided } = userData;
      const query = "INSERT INTO users (id, username, firstName, lastName, email, password, valided) VALUES  ($1, $2, $3, $4, $5, $6, $7)";
      const values = [id, username, firstName, lastName, email, password, false];
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
      const query = `SELECT id, username, email, firstName, lastName, gender, beverage, sexual_preference, description, rate_fame, position , profile_picture, valided FROM users WHERE ${paramToSearch} = $1`;
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
  static uploadImageInDb = async (buffer, userId) => {
    const query = `UPDATE users SET profile_picture = $1 WHERE id = $2`;
    const values = [buffer, userId];
    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (e) {
      console.log("error with upload file", e);
    }
  };
  static getImageProfil = async (id) => {
    const query = `SELECT profile_picture FROM users WHERE id = $1`;
    const values = [id];
    try {
      const imageProfil = await db.query(query, values);
      return imageProfil.rows[0].profile_picture;
    } catch (error) {
      console.log("error, cant get imageProfile", error);
    }
  };
  static getAll = (currentUserId) => {
    return new Promise((next) => {
      db.query("SELECT sexual_preference rate_fame, position FROM users WHERE id = $1", [currentUserId])
        .then((result) => {
          const [sexual_preference, rate_fame, position] = result.rows[0];
          let min_fame = rate_fame - 200;
          let max_fame = rate_fame + 200;
          console.log(position);
          if (sexual_preference !== "both") {
            db.query(
              "SELECT username, position, profile_picture FROM users \
            WHERE gender = $1 AND WHERE rate_fame BETWEEN $2 AND $3",
              [sexual_preference, min_fame, max_fame]
            )
              .then((result) => next(result.rows))
              .catch((err) => next(err));
          } else {
            db.query(
              "SELECT username, position, profile_picture FROM users \
            WHERE rate_fame BETWEEN $1 AND $2",
              [min_fame, max_fame]
            )
              .then((result) => next(result.rows))
              .catch((err) => next(err));
          }
        })
        .catch((err) => next(err));
    });
  };
  static getAllEnum = async () => {
    const enumGender = [];
    const enumTags = [];
    const enumSexualPreference = [];
    const enumBeverage = [];
    try {
      enumGender = db.query("SELECT enum_range(NULL::gender_enum");
      enumTags = db.query("SELECT enum_range(NULL::tags_enum");
      enumSexualPreference = db.query("SELECT enum_range(NULL::sexual_preference_enum");
      enumBeverage = db.query("SELECT enum_range(NULL::beverage_enum");
      return { enumGender: await enumGender, enumTags: await enumTags, enumBeverage: await enumBeverage, enumSexualPreference: await enumSexualPreference };
    } catch (error) {
      throw error;
    }
  };
  // static updateInfoProfile= async (req, res) => {
  //   // pvr update les infomartions du profile
  //   // tout sauf username,
  // }
}

module.exports = {
  UserModel,
};
