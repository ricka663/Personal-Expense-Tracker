const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { addExpense, getExpenses, updateExpense, deleteExpense } = require("../controllers/expenseController");

// Ajouter une dépense
router.post("/", auth, addExpense);

// Lister les dépenses de l’utilisateur connecté
router.get("/", auth, getExpenses);

// Modifier une dépense
router.put("/:id", auth, updateExpense);

// Supprimer une dépense
router.delete("/:id", auth, deleteExpense);

module.exports = router;
