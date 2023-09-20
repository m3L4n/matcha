const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

class TokenModel {
  static createToken = async (dataToken) => {
    try {
      const { user_id, token } = dataToken;
      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 1);
      const query = "INSERT INTO token (id, token, expire_at) VALUES  ($1, $2, $3)";
      const values = [user_id, token, expirationDate];
      const newUser = await db.query(query, values);
      return newUser;
    } catch (error) {
      throw error;
    }
  };
  static verifyToken = async (dataToken) => {
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
  static findToken = async (idUser) => {
    try {
      const query = "SELECT * FROM token WHERE id = $1";
      const response = await db.query(query, [idUser]);
      return response.rows[0];
    } catch (e) {
      throw error;
    }
  };
  static deleteToken = async (idUser) => {
    try {
      const query = "DELETE FROM token where id = $1";
      const response = await db.query(query, [idUser]);
      return response.rows[0];
    } catch (e) {
      throw error;
    }
  };
}
module.exports = {
  TokenModel,
};
