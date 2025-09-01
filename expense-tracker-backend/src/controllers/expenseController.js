const pool = require("../config/db");
const path = require("path");

// Ajouter une dépense
exports.addExpense = async (req, res) => {
  const { amount, category, description, date, type, startDate, endDate } = req.body;
  const receipt = req.file ? req.file.filename : null;

  try {
    const newExpense = await pool.query(
      `INSERT INTO expenses (user_id, amount, category, description, date, type, start_date, end_date, receipt)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [req.user.id, amount, category, description, date, type || "one-time", startDate || null, endDate || null, receipt]
    );
    res.status(201).json(newExpense.rows[0]);
  } catch (err) {
    console.error("❌ addExpense:", err);
    res.status(500).json({ error: err.message });
  }
};

// Lister toutes les dépenses
exports.getExpenses = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM expenses WHERE user_id=$1 ORDER BY date DESC",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ getExpenses:", err);
    res.status(500).json({ error: err.message });
  }
};

// Modifier une dépense
exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const { amount, category, description, date, type, startDate, endDate } = req.body;
  const receipt = req.file ? req.file.filename : null;

  try {
    const result = await pool.query(
      `UPDATE expenses
       SET amount=$1, category=$2, description=$3, date=$4, type=$5, start_date=$6, end_date=$7, receipt=COALESCE($8, receipt)
       WHERE id=$9 AND user_id=$10 RETURNING *`,
      [amount, category, description, date, type || "one-time", startDate || null, endDate || null, receipt, id, req.user.id]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: "Dépense non trouvée" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ updateExpense:", err);
    res.status(500).json({ error: err.message });
  }
};

// Supprimer une dépense
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM expenses WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, req.user.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Dépense non trouvée" });
    res.json({ message: "Dépense supprimée" });
  } catch (err) {
    console.error("❌ deleteExpense:", err);
    res.status(500).json({ error: err.message });
  }
};

// Télécharger un reçu
exports.getReceipt = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT receipt FROM expenses WHERE id=$1 AND user_id=$2",
      [id, req.user.id]
    );
    if (result.rows.length === 0 || !result.rows[0].receipt) {
      return res.status(404).json({ error: "Reçu non trouvé" });
    }
    const filePath = path.join(__dirname, "../uploads", result.rows[0].receipt);
    res.download(filePath);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
