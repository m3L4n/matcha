const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");
const createUser = async (userData) => {
  try {
    const { id, username, firstName, lastName, email, password } = userData;
    const query = "INSERT INTO users (id, username, firstName, lastName, email, password, valided) VALUES  ($1, $2, $3, $4, $5, $6, $7)";
    const values = [id, username, firstName, lastName, email, password, false];
    const newUser = await db.query(query, values);
    return newUser;
  } catch (error) {
    throw error;
  }
};
const findbyId = async (paramToSearch, valueToCompare) => {
  try {
    const query = `SELECT *  FROM users WHERE ${paramToSearch} = $1`;
    const user = await db.query(query, [valueToCompare]);
    return user.rows[0];
  } catch (error) {
    throw error;
  }
};
const findbyIwithouthPassword = async (paramToSearch, valueToCompare) => {
  try {
    const query = `SELECT username, email, firstName, lastName, gender, beverage, sexual_preference, description, rate_frame, position , profile_picture, valided FROM users WHERE ${paramToSearch} = $1`;
    const user = await db.query(query, [valueToCompare]);
    return user.rows[0];
  } catch (error) {
    throw error;
  }
};
/** */
const update = async (userId, paramToUpdate, valueToChange) => {
  try {
    const query = `UPDATE users SET ${paramToUpdate} = $1 WHERE id = $2`;
    const values = [valueToChange, userId];
    const updatedUser = await db.query(query, values);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createUser,
  findbyId,
  findbyIwithouthPassword,
  update,
};
