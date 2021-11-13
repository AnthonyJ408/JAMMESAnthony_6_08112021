//Récupération du modèle Sauce de mongoose
const Sauce = require("../models/sauce");
//Package node qui permet d'accéder au dossier du système
const fs = require("fs");

exports.createSauce = (req, res, next) => {
  const SauceObject = JSON.parse(req.body.sauce);
  delete SauceObject._id;
  //Utilisation du modèle Sauce de mongoose
  const sauce = new Sauce({
    //L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body
    ...SauceObject,
    //Récupération de l'image de façon dynamique dans le dossier images
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  //Méthode "save" utilisée pour envoyer les données enregistrés
  //dans le modèle Sauce à la base de données MongoDB sous forme de collections du nom de "sauces"
  sauce
    .save()
    .then(() => res.status(201).json({ message: "registered sauce !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  //Méthode .findOne qui va retourner une sauce avec l'id envoyé dans la requête
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifySauce = (req, res, next) => {
  //Vérifie s'il y a ou non une image dans la requête
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  //Méthode .updateOne qui prend deux paramétres l'id du produit et le nouveau produit à actualiser
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Sauce modified!" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  //on retrouve l'objet avec l'id contenu dans les paramétres de route
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      //Supprime l'image avec la fonction unlink de fs
      fs.unlink(`images/${filename}`, () => {
        //Méthode .deleteOne qui va supprimer un objet avec l'id renseigné dans les paramétres
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce deleted !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
  //Méthode .find qui va retourner toute la colection sauces stockée dans MongoDB
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
exports.likeSauce = (req, res, next) => {
  switch (req.body.like) {
    // 3 cas possibles dans l'objet like de la requête :(1,-1 ou 0)
    case 1:
      //Avec la valeur 1 on ajoute +1 dans le tableau des "likes", et on ajoute l'id
      //de l'utilisateur au tableau "usersLiked" avec les opérateurs MongoDB "$inc,$push"
      Sauce.updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
          $push: { usersLiked: req.body.userId },
        }
      )
        .then(() => {
          res
            .status(200)
            .json({
              message: `User: ${req.body.userId} liked sauce:${req.params.id}`,
            });
        })
        .catch((error) => {
          res.status(400).json({ error: error });
        });
      break;
    case -1:
      //Avec la valeur -1 on ajoute +1 dans le tableau des "dislikes", et on ajoute l'id
      // de l'utilisateur au tableau "usersdisliked" avec les opérateurs MongoDB "$inc,$push"
      Sauce.updateOne(
        { _id: req.params.id },
        {
          $inc: { dislikes: 1 },
          $push: { usersDisliked: req.body.userId },
        }
      )
        .then(() => {
          res
            .status(200)
            .json({
              message: `User: ${req.body.userId} disliked sauce:${req.params.id}`,
            });
        })
        .catch((error) => {
          res.status(400).json({ error: error });
        });
      break;
    case 0:
      //Avec la valeur 0 on annule en ajoutant -1 dans le tableau correspondant  et on enléve l'id
      // de l'utilisateur du tableau correspondant avec les opérateurs MongoDB "$inc,$pull"
      Sauce.findOne({ _id: req.params.id })
        .then((arrayLike) => {
          //On cherche une correspondance de l'utilisateur dans un des deux tableau usersliked ou usersdisliked
          if (
            arrayLike.usersLiked.find((userId) => userId === req.body.userId)
          ) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: -1 },
                $pull: { usersLiked: req.body.userId },
              }
            )
              .then(() => {
                res
                  .status(200)
                  .json({
                    message: `User: ${req.body.userId} cancelled his like on sauce:${req.params.id}`,
                  });
              })
              .catch((error) => {
                res.status(400).json({ error: error });
              });
          } else if (
            arrayLike.usersDisliked.find((userId) => userId === req.body.userId)
          ) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: req.body.userId },
              }
            )
              .then(() => {
                res
                  .status(200)
                  .json({
                    message: `User: ${req.body.userId} cancelled his like on sauce:${req.params.id}`,
                  });
              })
              .catch((error) => {
                res.status(400).json({ error: error });
              });
          }
        })
        .catch((error) => {
          res.status(404).json({ error: error });
        });
      break;
  }
};
