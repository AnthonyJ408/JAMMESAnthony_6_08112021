const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');
const Sauce = require('./models/sauce');
const path = require('path');
const bodyParser = require('body-parser');
const sauceRoutes = require('./routes/sauce');
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(bodyParser.json())
mongoose.connect('mongodb+srv://new_user17:user17@cluster0.snhak.mongodb.net/test',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
module.exports=app;
