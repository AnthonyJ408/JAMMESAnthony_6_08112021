//Utilisation du framework Express pour faciliter le développement du serveur
const express = require("express");
const app = express();
//Package mongoose pour faciliter les intéractions avec une base de données
const mongoose = require("mongoose");
const path = require("path");
//BodyParser pour transformer le corps de la requête en JSON
const bodyParser = require("body-parser");
//Router
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");
//CORS, Accés depuis n'importe quelle origine avec les méthodes mentionnées
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
//Connexion à la base de données MongoDB via le module mongoose avec des variables d'environnement sur l'utilisateur et le mdp
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.snhak.mongodb.net/test`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  //Retour des erreurs liées à la base de données
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
app.use(express.json());
app.use(bodyParser.json());
//Autoriser la requête sur le dossier statique images
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);
//Export d'express pour le "require" dans d'autres fichiers
module.exports = app;
