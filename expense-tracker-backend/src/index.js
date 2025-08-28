const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import des routes
const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expenses"); // ✅ Dépenses
const incomeRoutes = require("./routes/incomes");   // ✅ Revenus

// Utilisation des routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes); 
app.use("/api/incomes", incomeRoutes);   // ✅ ajout ici

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
