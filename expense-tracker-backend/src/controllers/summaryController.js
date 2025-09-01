const pool = require("../config/db");

// ================= Résumé mensuel =================
exports.getMonthlySummary = async (req, res) => {
  const { month, from, to } = req.query;
  const userId = req.user.id;

  try {
    let queryExpenses = `SELECT COALESCE(SUM(amount),0) as total FROM expenses WHERE user_id = $1`;
    let queryIncomes = `SELECT COALESCE(SUM(amount),0) as total FROM incomes WHERE user_id = $1`;
    let params = [userId];

    if (month) {
      // transformer 2025-08 -> 2025-08-01
      const parsedMonth = `${month}-01`;
      queryExpenses += ` AND DATE_TRUNC('month', date) = DATE_TRUNC('month', $2::date)`;
      queryIncomes  += ` AND DATE_TRUNC('month', date) = DATE_TRUNC('month', $2::date)`;
      params.push(parsedMonth);
    } else if (from && to) {
      queryExpenses += ` AND date BETWEEN $2 AND $3`;
      queryIncomes  += ` AND date BETWEEN $2 AND $3`;
      params.push(from, to);
    }

    const expenses = await pool.query(queryExpenses, params);
    const incomes = await pool.query(queryIncomes, params);

    const totalExpenses = parseFloat(expenses.rows[0].total);
    const totalIncomes = parseFloat(incomes.rows[0].total);

    res.json({
      total_incomes: totalIncomes,
      total_expenses: totalExpenses,
      balance: totalIncomes - totalExpenses
    });
  } catch (err) {
    console.error("❌ getMonthlySummary:", err.message);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};

// ================= Pie chart =================
exports.getExpensesByCategory = async (req, res) => {
  const { month } = req.query;
  const userId = req.user.id;

  try {
    let query = `
      SELECT category AS label, COALESCE(SUM(amount),0) as value
      FROM expenses
      WHERE user_id = $1
    `;
    let params = [userId];

    if (month) {
      const parsedMonth = `${month}-01`;
      query += ` AND DATE_TRUNC('month', date) = DATE_TRUNC('month', $2::date)`;
      params.push(parsedMonth);
    }

    query += ` GROUP BY category ORDER BY value DESC`;

    const result = await pool.query(query, params);

    res.json(result.rows);
  } catch (err) {
    console.error("❌ getExpensesByCategory:", err.message);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};

// ================= Bar chart =================
exports.getMonthlyExpenses = async (req, res) => {
  const { from, to } = req.query;
  const userId = req.user.id;

  try {
    let query = `
      SELECT TO_CHAR(DATE_TRUNC('month', date), 'YYYY-MM') as month,
             COALESCE(SUM(amount),0) as total
      FROM expenses
      WHERE user_id = $1
    `;
    let params = [userId];

    if (from && to) {
      query += ` AND date BETWEEN $2 AND $3`;
      params.push(from, to);
    }

    query += ` GROUP BY month ORDER BY month`;

    const result = await pool.query(query, params);

    res.json(result.rows);
  } catch (err) {
    console.error("❌ getMonthlyExpenses:", err.message);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};

// ================= Budget Monitoring / Alerts =================
exports.getAlerts = async (req, res) => {
  const userId = req.user.id;

  try {
    // Mois courant (YYYY-MM -> YYYY-MM-01)
    const month = new Date().toISOString().slice(0, 7);
    const parsedMonth = `${month}-01`;

    // Totaux du mois courant
    const [{ rows: expRows }, { rows: incRows }] = await Promise.all([
      pool.query(
        `SELECT COALESCE(SUM(amount),0) AS total
         FROM expenses
         WHERE user_id = $1
           AND DATE_TRUNC('month', date) = DATE_TRUNC('month',$2::date)`,
        [userId, parsedMonth]
      ),
      pool.query(
        `SELECT COALESCE(SUM(amount),0) AS total
         FROM incomes
         WHERE user_id = $1
           AND DATE_TRUNC('month', date) = DATE_TRUNC('month',$2::date)`,
        [userId, parsedMonth]
      ),
    ]);

    const totalExp = parseFloat(expRows[0].total);
    const totalInc = parseFloat(incRows[0].total);

    if (totalExp > totalInc) {
      return res.json({
        alert: true,
        message: `You've exceeded your monthly budget by $${(totalExp - totalInc).toFixed(2)}`
      });
    }

    return res.json({
      alert: false,
      message: `Budget respected. You still have $${(totalInc - totalExp).toFixed(2)} left`
    });
  } catch (err) {
    console.error("❌ getAlerts:", err.message);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};
