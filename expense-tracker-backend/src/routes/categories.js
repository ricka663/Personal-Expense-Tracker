const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Créer une catégorie
router.post("/", auth, addCategory);

// Lister mes catégories
router.get("/", auth, getCategories);

// Modifier une catégorie
router.put("/:id", auth, updateCategory);

// Supprimer une catégorie
router.delete("/:id", auth, deleteCategory);

module.exports = router;
