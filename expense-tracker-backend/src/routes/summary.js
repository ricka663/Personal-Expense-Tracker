const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getMonthlySummary,
  getExpensesByCategory,
  getMonthlyExpenses,
  getAlerts
} = require("../controllers/summaryController");

// ================= Résumé mensuel =================
router.get("/monthly", auth, getMonthlySummary);

// ================= Pie chart : dépenses par catégorie =================
router.get("/pie", auth, getExpensesByCategory);

// ================= Bar chart : dépenses mensuelles =================
router.get("/bars", auth, getMonthlyExpenses);

// ================= Budget Monitoring / Alerts =================
router.get("/alerts", auth, getAlerts);

module.exports = router;
