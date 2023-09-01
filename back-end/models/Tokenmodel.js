const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");
const createToken = async (dataToken) => {
  try {
    const { user_id, token } = dataToken;
    const query = "INSERT INTO token (id, token) VALUES  ($1, $2)";
    const values = [user_id, token];
    const newUser = await db.query(query, values);
    return newUser;
  } catch (error) {
    throw error;
  }
};
const verifyToken = async (dataToken) => {
  try {
    const { id, token } = dataToken;
    console.log(id, token);
    const query = "SELECT * FROM token WHERE id = $1 AND token = $2";
    const values = [id, token];
    const response = await db.query(query, values);
    return response.rows[0];
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createToken,
  verifyToken,
};
