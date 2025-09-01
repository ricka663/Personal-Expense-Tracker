const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ===================== SIGNUP =====================
exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Cet email est déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (email, password, created_at) VALUES ($1, $2, NOW()) RETURNING id, email, created_at",
      [email, hashedPassword]
    );

    res.status(201).json({ message: "Utilisateur créé", user: newUser.rows[0] });
  } catch (err) {
    console.error("❌ Erreur serveur (signup):", err);
    res.status(500).json({ error: err.message });
  }
};

// ===================== LOGIN =====================
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: "Utilisateur non trouvé" });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Connexion réussie", token });
  } catch (err) {
    console.error("❌ Erreur serveur (login):", err);
    res.status(500).json({ error: err.message });
  }
};

// ===================== ME =====================
exports.me = async (req, res) => {
  try {
    const user = await pool.query("SELECT id, email, created_at FROM users WHERE id = $1", [req.user.id]);
    if (user.rows.length === 0) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
