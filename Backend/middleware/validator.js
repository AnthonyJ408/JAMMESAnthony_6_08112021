//Variable pour le retour des erreurs d'express-validator
const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}
else{
    next();
}
}