import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Partie gauche (Bienvenue) */}
        <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-10 flex flex-col justify-center text-white">
          <h1 className="text-3xl font-bold mb-4">Welcome to BudgetApp</h1>
          <p className="text-sm leading-relaxed">
            Manage your income and expenses with ease.
            With BudgetApp, track your finances, analyze your habits, and always stay in control of your budget."
          </p>
        </div>

        {/* Partie droite (Login form) */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-center text-purple-600 mb-6">
            USER LOGIN
          </h2>
          <form onSubmit={handleLogin} className="space-y-5">
            
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 text-purple-500" />
                <span>Remember</span>
              </label>
              <a href="#" className="hover:underline">Forgot password?</a>
            </div>

            {/* Bouton */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
