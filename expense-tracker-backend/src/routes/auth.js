// fichier routes
const express = require("express");
const router = express.Router();
const { signup, login, me } = require("../controllers/authController");
const auth = require("../middleware/auth");

// Route d’inscription
router.post("/signup", signup);

// Route de connexion
router.post("/login", login);

// Route pour récupérer le profil de l’utilisateur connecté
router.get("/me", auth, me);

module.exports = router;
