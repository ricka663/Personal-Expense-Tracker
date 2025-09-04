import { useState } from "react";

export default function DashboardPage() {
  const [income, setIncome] = useState(2000);
  const [expenses, setExpenses] = useState(2300);

  const balance = income - expenses;
  const exceeded = balance < 0;

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-500 to-pink-500">
      {/* Navbar gauche */}
      <nav className="w-64 bg-gradient-to-br from-purple-700 to-pink-600 text-white flex flex-col p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-8">💰 BudgetApp</h2>
        <ul className="space-y-4">
          <li className="hover:bg-white/20 p-3 rounded-xl cursor-pointer transition">
            Dashboard
          </li>
          <li className="hover:bg-white/20 p-3 rounded-xl cursor-pointer transition">
            Revenus
          </li>
          <li className="hover:bg-white/20 p-3 rounded-xl cursor-pointer transition">
            Dépenses
          </li>
          <li className="hover:bg-white/20 p-3 rounded-xl cursor-pointer transition">
            Paramètres
          </li>
        </ul>
      </nav>

      {/* Contenu droite */}
      <main className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Tableau de bord</h1>

        {/* Alert si budget dépassé */}
        {exceeded && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6 shadow">
            🚨 Vous avez dépassé votre budget de {Math.abs(balance)} Ar
          </div>
        )}

        {/* Résumé */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/90 p-6 rounded-2xl shadow-lg text-center backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-gray-600">Revenus</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">{income} Ar</p>
          </div>
          <div className="bg-white/90 p-6 rounded-2xl shadow-lg text-center backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-gray-600">Dépenses</h2>
            <p className="text-3xl font-bold text-red-600 mt-2">{expenses} Ar</p>
          </div>
          <div className="bg-white/90 p-6 rounded-2xl shadow-lg text-center backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-gray-600">Balance</h2>
            <p
              className={`text-3xl font-bold mt-2 ${
                balance < 0 ? "text-red-600" : "text-purple-600"
              }`}
            >
              {balance} Ar
            </p>
          </div>
        </div>

        {/* Placeholder pour graphiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/90 p-6 rounded-2xl shadow-lg backdrop-blur-sm">
            <h2 className="text-lg font-semibold mb-4 text-purple-600">
              Répartition des dépenses
            </h2>
            <div className="h-64 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded-xl">
              [Graphique camembert]
            </div>
          </div>
          <div className="bg-white/90 p-6 rounded-2xl shadow-lg backdrop-blur-sm">
            <h2 className="text-lg font-semibold mb-4 text-purple-600">
              Dépenses mensuelles
            </h2>
            <div className="h-64 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded-xl">
              [Graphique barres]
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
