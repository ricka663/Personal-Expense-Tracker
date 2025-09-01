const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getReceipt
} = require("../controllers/expenseController");

// Configuration Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // dossier où stocker
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// ================= Routes =================

// ➕ Ajouter une dépense (avec fichier optionnel)
router.post("/", auth, upload.single("receipt"), addExpense);

// ➕ Lister les dépenses
router.get("/", auth, getExpenses);

// ➕ Modifier une dépense (upload fichier possible)
router.put("/:id", auth, upload.single("receipt"), updateExpense);

// ➕ Supprimer une dépense
router.delete("/:id", auth, deleteExpense);

// ➕ Télécharger un reçu
router.get("/receipt/:id", auth, getReceipt);

module.exports = router;
