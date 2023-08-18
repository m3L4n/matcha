// routes/users.js
const express = require("express");
const router = express.Router();

// Importer le pool de connexion à la base de données
const pool = require("../../db/db");

// Route POST pour ajouter un utilisateur
router.post("/", async (req, res) => {
  const { username, email } = req.body;

  try {
    await pool.query("INSERT INTO users (username, email) VALUES ($1, $2)", [username, email]);
    res.status(201).json({ message: "Utilisateur ajouté avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur :", error);
    res.status(500).json({ error: "Erreur lors de l'ajout de l'utilisateur." });
  }
});

module.exports = router;
