const express = require("express");
const router = express.Router();
//Express Validator va vérifier les données contenu dans le champ "body"
const { body } = require("express-validator");
const auth = require("../middleware/auth");
const valid = require("../middleware/validator");
const multer = require("../middleware/multer-config");
const sauceCtrl = require("../controllers/sauce");
//CRUD Sauces avec vérifications des saisies via Express-validator
//Chaques routes est contrôllées avec Auth pour vérifier si l'utilisateur a les droits avant d'être exécutées
router.get("/", auth, sauceCtrl.getAllSauce);
router.post(
  "/",
  body("sauce")
    .isLength({ max: 50 })
    .withMessage("must be a maximum of 50 chars long"),
  valid,
  auth,
  multer,
  sauceCtrl.createSauce
);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.put(
  "/:id",
  body("sauce")
    .isLength({ max: 50 })
    .withMessage("must be a maximum of 50 chars long"),
  valid,
  auth,
  multer,
  sauceCtrl.modifySauce
);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post(
  "/:id/like",
  body("userId")
    .isLength({ min: 5, max: 50 })
    .withMessage("must be atleast 5 chars long and a maximum of 50 chars long"),
  body("like")
    .isDecimal()
    .isLength({ max: 2 })
    .withMessage("must be a maximum of 2 chars long"),
  valid,
  auth,
  sauceCtrl.likeSauce
);
//Exports des routes sauces
module.exports = router;
