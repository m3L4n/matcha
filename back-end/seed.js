// init-db.js
const { Pool } = require("pg");
require("dotenv").config();
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

async function insertUser() {
  const client = await pool.connect();
  try {
    await client.query(`
      INSERT INTO users (username, email)
      VALUES
        ('john_doe', 'john@example.com');
    `);

    console.log("Utilisateur inséré avec succès.");
  } catch (error) {
    console.error("Erreur lors de l'insertion de l'utilisateur :", error);
  } finally {
    client.release();
  }
}

insertUser();
