import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert("Les mots de passe ne correspondent pas");
    try {
      await API.post("/auth/signup", { email, password });
      alert("Compte créé avec succès !");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Erreur inscription");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-xl font-semibold text-purple-600 mb-6">Créer un compte</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full mb-3 p-3 border rounded-xl" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" className="w-full mb-3 p-3 border rounded-xl" />
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmer mot de passe" className="w-full mb-3 p-3 border rounded-xl" />
        <button type="submit" className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl">S'inscrire</button>
      </form>
    </div>
  );
}
