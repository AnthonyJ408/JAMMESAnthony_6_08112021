# Projet 6 Openclassrooms: PIIQUANTE

Le projet consiste à construire une API sécurisée pour une application d'avis gastronomique.
La responsable produit de Piiquante souhaite que l'on puisse ajouter/modifier/supprimer des sauces 
sur l'application et de "like" ou "dislike" un produit posté par d'autres utilisateurs. 
Les utilisateurs doivent être authentifiés pour accéder à la galerie de sauce et toutes les routes de l'API doivent être sécurisées.

<p align="center">
<img src="./Frontend/assets/readme_image.png">
</p>

### Pré-requis

Cloner le projet,
ensuite en étant à la racine du projet  lancer

```
$cd Backend
$ npm install
$cd ../Frontend
$npm install

```

Assurez vous d'avoir "nodemon" d'installer également.

### Installation

Créer également le dossier statique images qui va recevoir les fichiers multimédias des utilisateurs

```
  $ cd ../Backend
  $ mkdir images

```

## Démarrage

Lancer deux terminals distincts (le fichier .env est partagé volontairement pour faciliter l'accés au projet sur la table MongoDB) :
  le premier sur => 

```
  cd Frontend
  npm start
```
  
  le deuxième sur => 

```
  cd Backend
  npm start
```

## Fabriqué avec

* [node.js](https://nodejs.org/en/) - JavaScript runtime
* [MongoDB](https://www.mongodb.com/fr-fr) - Database Service NoSQL
* [Mongoose](https://mongoosejs.com/) - Bibliothèque JavaScript entre Express.js et MongoDB
* [Express.js](https://expressjs.com/fr/) - Framework Back-end





