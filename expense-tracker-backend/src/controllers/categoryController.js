const pool = require("../config/db");

// POST /api/categories
exports.addCategory = async (req, res) => {
  const { name, type } = req.body;
  try {
    if (!name || !type) return res.status(400).json({ error: "name et type requis" });
    if (!["income","expense"].includes(type)) {
      return res.status(400).json({ error: "type doit être 'income' ou 'expense'" });
    }

    const exists = await pool.query(
      "SELECT 1 FROM categories WHERE user_id=$1 AND LOWER(name)=LOWER($2) AND type=$3",
      [req.user.id, name, type]
    );
    if (exists.rowCount > 0) {
      return res.status(409).json({ error: "Cette catégorie existe déjà" });
    }

    const result = await pool.query(
      "INSERT INTO categories (user_id, name, type) VALUES ($1,$2,$3) RETURNING *",
      [req.user.id, name, type]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ addCategory:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET /api/categories
exports.getCategories = async (req, res) => {
  try {
    const rows = await pool.query(
      "SELECT * FROM categories WHERE user_id=$1 ORDER BY type, name",
      [req.user.id]
    );
    res.json(rows.rows);
  } catch (err) {
    console.error("❌ getCategories:", err);
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/categories/:id
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;

  try {
    if (type && !["income","expense"].includes(type)) {
      return res.status(400).json({ error: "type doit être 'income' ou 'expense'" });
    }

    const result = await pool.query(
      `UPDATE categories
       SET name = COALESCE($1, name),
           type = COALESCE($2, type)
       WHERE id=$3 AND user_id=$4
       RETURNING *`,
      [name ?? null, type ?? null, id, req.user.id]
    );

    if (result.rowCount === 0) return res.status(404).json({ error: "Catégorie non trouvée" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ updateCategory:", err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/categories/:id
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await pool.query(
      "DELETE FROM categories WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, req.user.id]
    );
    if (del.rowCount === 0) return res.status(404).json({ error: "Catégorie non trouvée" });
    res.json({ message: "Catégorie supprimée" });
  } catch (err) {
    console.error("❌ deleteCategory:", err);
    res.status(500).json({ error: err.message });
  }
};
