const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { addIncome, getIncomes, updateIncome, deleteIncome } = require("../controllers/incomeController");

// Ajouter un revenu
router.post("/", auth, addIncome);

// Lister les revenus
router.get("/", auth, getIncomes);

// Modifier un revenu
router.put("/:id", auth, updateIncome);

// Supprimer un revenu
router.delete("/:id", auth, deleteIncome);

module.exports = router;
