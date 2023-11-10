const { Pool } = require("pg");
require("dotenv").config();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const checkDatabaseConnection = async () => {
  let retries = 5;
  while (retries) {
    try {
      await pool.query("SELECT NOW()");
      console.log("Database ready");
      return;
    } catch (err) {
      console.error("Error: When connecting to database", err);
      retries--;
      await new Promise((res) => setTimeout(res, 2000));
    }
  }
  process.exit(1); // Sortie avec un code d'erreur en cas d'échec de la connexion
};

checkDatabaseConnection();
