const express = require("express");
const app = express();

// Importer le routeur des utilisateurs
const userRouter = require("./routes/users/users");

// Middleware pour parser le JSON des requêtes
app.use(express.json());

// Utiliser le routeur des utilisateurs
app.use("/users", userRouter);

// Autres routes et configurations

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
