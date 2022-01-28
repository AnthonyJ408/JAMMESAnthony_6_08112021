const express = require("express");
const router = express.Router();
const valid = require("../middleware/validator");
const userCtrl = require("../controllers/user");
//Express Validator va vérifier les données contenu dans le champ "body"
const { body } = require("express-validator");
//CRUD Users avec vérifications des saisies via Express-validator
router.post(
  "/signup",
  body("email").isEmail().withMessage("must be a valid email"),
  body("password")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .withMessage("must contain at least eight characters, including at least one number and includes both lower and uppercase letters and special characters"),
  valid,
  userCtrl.signup
);
router.post(
  "/login",
  body("email").isEmail().withMessage("must be a valid email"),
  body("password")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .withMessage("must contain at least eight characters, including at least one number and includes both lower and uppercase letters and special characters"),
  valid,
  userCtrl.login
);
//Exports des routes users
module.exports = router;
