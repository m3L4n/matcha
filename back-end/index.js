const express = require("express");
const app = express();

const port = process.env.PORT || 4000; // Utilise le port spécifié dans les variables d'environnement, ou 3000 par défaut

app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});
