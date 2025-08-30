const pool = require("../config/db");

// Créer un revenu
exports.createIncome = async (req, res) => {
  const { amount, source, description, date } = req.body;
  const userId = req.user.id;

  try {
    if (!amount || !source || !date) {
      return res.status(400).json({ error: "amount, source et date sont requis" });
    }

    const result = await pool.query(
      "INSERT INTO incomes (user_id, amount, source, description, date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userId, amount, source, description || null, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ createIncome:", err.message);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};

// Lister tous les revenus
exports.getIncomes = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query(
      "SELECT * FROM incomes WHERE user_id = $1 ORDER BY date DESC",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ getIncomes:", err.message);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};

// Mettre à jour un revenu
exports.updateIncome = async (req, res) => {
  const { id } = req.params;
  const { amount, source, description, date } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "UPDATE incomes SET amount=$1, source=$2, description=$3, date=$4 WHERE id=$5 AND user_id=$6 RETURNING *",
      [amount, source, description, date, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Revenu non trouvé" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ updateIncome:", err.message);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};

// Supprimer un revenu
exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "DELETE FROM incomes WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Revenu non trouvé" });
    }

    res.json({ message: "Revenu supprimé" });
  } catch (err) {
    console.error("❌ deleteIncome:", err.message);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};
