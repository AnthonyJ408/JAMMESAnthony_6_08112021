const mongoose = require('mongoose');
//Shéma de données du package mongoose pour pouvoir stockés les informations contenu dans les requêtes
//Shéma sous forme de clés valeurs, avec les données requises ou non et le type de données attendu
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  usersLiked: { type: Array, required: false },
  usersDisliked: { type: Array, required: false }
});
//export du shéma avec son nom
module.exports = mongoose.model('Sauce', sauceSchema);