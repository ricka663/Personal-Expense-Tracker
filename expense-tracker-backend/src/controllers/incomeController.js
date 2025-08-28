const pool = require("../config/db");

// Ajouter un revenu
exports.addIncome = async (req, res) => {
  const { amount, source, description, date } = req.body;

  try {
    const newIncome = await pool.query(
      "INSERT INTO incomes (user_id, amount, source, description, date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [req.user.id, amount, source, description, date]
    );
    res.status(201).json(newIncome.rows[0]);
  } catch (err) {
    console.error("❌ Erreur addIncome:", err);
    res.status(500).json({ error: err.message });
  }
};

// Lister les revenus
exports.getIncomes = async (req, res) => {
  try {
    const incomes = await pool.query("SELECT * FROM incomes WHERE user_id = $1 ORDER BY date DESC", [req.user.id]);
    res.json(incomes.rows);
  } catch (err) {
    console.error("❌ Erreur getIncomes:", err);
    res.status(500).json({ error: err.message });
  }
};

// Modifier un revenu
exports.updateIncome = async (req, res) => {
  const { id } = req.params;
  const { amount, source, description, date } = req.body;

  try {
    const updated = await pool.query(
      "UPDATE incomes SET amount=$1, source=$2, description=$3, date=$4 WHERE id=$5 AND user_id=$6 RETURNING *",
      [amount, source, description, date, id, req.user.id]
    );

    if (updated.rows.length === 0) return res.status(404).json({ error: "Revenu non trouvé" });

    res.json(updated.rows[0]);
  } catch (err) {
    console.error("❌ Erreur updateIncome:", err);
    res.status(500).json({ error: err.message });
  }
};

// Supprimer un revenu
exports.deleteIncome = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await pool.query("DELETE FROM incomes WHERE id=$1 AND user_id=$2 RETURNING *", [id, req.user.id]);

    if (deleted.rows.length === 0) return res.status(404).json({ error: "Revenu non trouvé" });

    res.json({ message: "Revenu supprimé" });
  } catch (err) {
    console.error("❌ Erreur deleteIncome:", err);
    res.status(500).json({ error: err.message });
  }
};
