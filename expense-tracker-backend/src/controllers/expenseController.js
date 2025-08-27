const pool = require("../config/db");

// Ajouter une dépense
exports.addExpense = async (req, res) => {
  const { amount, category, description, date } = req.body;

  try {
    const newExpense = await pool.query(
      "INSERT INTO expenses (user_id, amount, category, description, date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [req.user.id, amount, category, description, date]
    );
    res.status(201).json(newExpense.rows[0]);
  } catch (err) {
    console.error("❌ Erreur addExpense:", err);
    res.status(500).json({ error: err.message });
  }
};

// Lister toutes les dépenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await pool.query("SELECT * FROM expenses WHERE user_id = $1 ORDER BY date DESC", [req.user.id]);
    res.json(expenses.rows);
  } catch (err) {
    console.error("❌ Erreur getExpenses:", err);
    res.status(500).json({ error: err.message });
  }
};

// Modifier une dépense
exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const { amount, category, description, date } = req.body;

  try {
    const updated = await pool.query(
      "UPDATE expenses SET amount=$1, category=$2, description=$3, date=$4 WHERE id=$5 AND user_id=$6 RETURNING *",
      [amount, category, description, date, id, req.user.id]
    );

    if (updated.rows.length === 0) return res.status(404).json({ error: "Dépense non trouvée" });

    res.json(updated.rows[0]);
  } catch (err) {
    console.error("❌ Erreur updateExpense:", err);
    res.status(500).json({ error: err.message });
  }
};

// Supprimer une dépense
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await pool.query("DELETE FROM expenses WHERE id=$1 AND user_id=$2 RETURNING *", [id, req.user.id]);

    if (deleted.rows.length === 0) return res.status(404).json({ error: "Dépense non trouvée" });

    res.json({ message: "Dépense supprimée" });
  } catch (err) {
    console.error("❌ Erreur deleteExpense:", err);
    res.status(500).json({ error: err.message });
  }
};
