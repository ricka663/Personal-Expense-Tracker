import React, { useState } from "react";

function App() {
  const [response, setResponse] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const BACKEND_URL = "http://localhost:4000";

  // Fonction générique pour appeler l'API
  const callAPI = async (endpoint, method = "GET", body = null, requireAuth = true) => {
    try {
      const headers = { "Content-Type": "application/json" };

      if (requireAuth && token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`${BACKEND_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });

      const data = await res.json();

      // Si login → sauvegarder le token
      if (endpoint.includes("/auth/login") && data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
      }

      setResponse(data);
    } catch (err) {
      console.error("❌ Erreur API:", err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Personal Expense Tracker - Test Frontend</h2>

      {/* LOGIN */}
      <button
        onClick={() =>
          callAPI("/api/auth/login", "POST", {
            email: "randria@example.com",
            password: "randria123",
          }, false)
        }
      >
        🔑 Login
      </button>

      {/* ROUTES PROTÉGÉES */}
      <button onClick={() => callAPI("/api/categories")}>📂 Voir catégories</button>
      <button onClick={() => callAPI("/api/incomes")}>💰 Voir revenus</button>
      <button onClick={() => callAPI("/api/expenses")}>🛒 Voir dépenses</button>
      <button onClick={() => callAPI("/api/summary/monthly?month=2025-08")}>
        📊 Voir résumé mensuel
      </button>
      <button onClick={() => callAPI("/api/summary/alerts")}>⚠️ Voir alertes budget</button>

      {/* LOGOUT */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          setToken(null);
          setResponse("Déconnecté ✅");
        }}
      >
        🚪 Logout
      </button>

      {/* Affichage JSON brut */}
      <pre style={{ background: "#111", color: "#0f0", padding: "10px", marginTop: "20px" }}>
        {response ? JSON.stringify(response, null, 2) : "👉 Clique sur un bouton pour tester l'API"}
      </pre>
    </div>
  );
}

export default App;
