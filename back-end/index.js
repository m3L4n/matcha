// import express from "express";
const express = require("express");
require("dotenv").config();
const app = express();
const { Pool } = require("pg");
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Erreur lors de la connexion à la base de données", err);
  }
  console.log("Connecté à la base de données");
  client.release();
});
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
