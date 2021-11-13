//Récupération du modèle Users de mongoose
const User = require("../models/User");
//Création de token pour sécuriser le systéme d'authentification du site
const jwt = require("jsonwebtoken");
//Package de cryptage pour les mots de passe
const bcrypt = require("bcrypt");

exports.signup = (req, res, next) => {
  bcrypt
    //Méthode hash de bcrypt qui va éxécuter 9 "salt" ou "round" de l'algorithme sur le mot de passe pour le crypté
    .hash(req.body.password, 9)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      //Enregistrement du nouvel utilisateur dans la base de donnée avec son email et un mot de passe crypté
      user
        .save()
        .then(() => res.status(201).json({ message: "User registered  !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.login = (req, res, next) => {
  //Récupérer l'utilisateur dans la base de donnée via son adresse mail qui est dans la requête
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User not found!" });
      }
      //Méthode compare de bcrypt qui va comparer le hash entrant et le hash de la base de donnée
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Incorrect password !" });
          }
          //UserId encodé pour gérer les utilisateurs, pour pouvoir reconnaître quel utilisateur a créé quel produit
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "MEGASECRETkey25054426165", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(501).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
