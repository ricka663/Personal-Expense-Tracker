import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    console.log("Nom:", name, "Email:", email, "Password:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Partie gauche (Bienvenue) */}
        <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-10 flex flex-col justify-center text-white">
          <h1 className="text-3xl font-bold mb-4">Create Account</h1>
          <p className="text-sm leading-relaxed">
            Log in now to start optimizing your finances!
          </p>
        </div>

        {/* Partie droite (Formulaire d'inscription) */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-center text-purple-600 mb-6">
            REGISTER
          </h2>
          <form onSubmit={handleRegister} className="space-y-5">
            
            <div>
              <input
                type="text"
                placeholder="Nom complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

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
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Bouton */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition"
            >
              S'inscrire
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Déjà un compte ?{" "}
            <a href="#" className="text-purple-600 hover:underline">
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
