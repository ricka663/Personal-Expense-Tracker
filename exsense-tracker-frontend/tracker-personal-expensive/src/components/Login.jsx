import { useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Erreur de connexion");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
      {/* Formulaire identique, mais connecté au backend */}
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-xl font-semibold text-purple-600 mb-6">Connexion</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full mb-3 p-3 border rounded-xl" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" className="w-full mb-3 p-3 border rounded-xl" />
        <button type="submit" className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl">Se connecter</button>
      </form>
    </div>
  );
}
