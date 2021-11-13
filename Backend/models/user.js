const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//Shéma de données du package mongoose pour pouvoir stockés les informations contenu dans les requêtes
//Shéma sous forme de clés valeurs, avec les données requises ou non et le type de données attendu
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
//Plugin mongoose qui permet de vérifier qu'une seule adresse email puisse être rentrer pour créer un nouvel utilisateur
userSchema.plugin(uniqueValidator);
//export du shéma avec son nom
module.exports = mongoose.model('User', userSchema);