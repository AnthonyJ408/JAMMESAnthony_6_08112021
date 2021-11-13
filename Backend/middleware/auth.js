const jwt = require('jsonwebtoken');
//Middleware Auth pour comparer les tokens d'authentification
module.exports = (req, res, next) => {
  try {
    //Récupération du token dans le header.authorization aprés le bearer
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'MEGASECRETkey25054426165');
    //Récupération de l'ID utilisateur aprés le décodage 
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(403).json({
      error: new Error('unauthorized request')
    });
  }
};
