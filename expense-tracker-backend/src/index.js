const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import des routes
const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expenses"); // ✅ nouvelle route
const categoryRoutes = require("./routes/categories");
const incomeRoutes = require("./routes/incomes");
const summaryRoutes = require("./routes/summary");

// Utilisation des routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes); // ✅ ajout ici
app.use("/api/categories", categoryRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/incomes", incomeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
