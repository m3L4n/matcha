const db = require("../db/db");
const deletedataExpiredFromToken = async () => {
  try {
    const query = "DELETE FROM token WHERE expire_at <= NOW()";
    await db.query(query);
    console.log("data expired are deleted");
  } catch (error) {
    console.error("error cant delete this token :", error);
  }
};

module.exports = {
  deletedataExpiredFromToken,
};
