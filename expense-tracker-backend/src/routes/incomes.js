const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createIncome,
  getIncomes,
  updateIncome,
  deleteIncome
} = require("../controllers/incomeController");

// Créer un revenu
router.post("/", auth, createIncome);

// Lister tous les revenus
router.get("/", auth, getIncomes);

// Modifier un revenu
router.put("/:id", auth, updateIncome);

// Supprimer un revenu
router.delete("/:id", auth, deleteIncome);

module.exports = router;
