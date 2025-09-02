import { useEffect, useState } from "react";
import api from "../api";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    api.get("/expenses").then((res) => setExpenses(res.data));
  }, []);

  const addExpense = async (e) => {
    e.preventDefault();
    const res = await api.post("/expenses", { amount, category, description, date: new Date() });
    setExpenses([...expenses, res.data]);
    setAmount("");
    setCategory("");
    setDescription("");
  };

  return (
    <div>
      <h2>Dépenses</h2>
      <form onSubmit={addExpense}>
        <input type="number" placeholder="Montant" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <input type="text" placeholder="Catégorie" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {expenses.map((exp) => (
          <li key={exp.id}>{exp.category} - {exp.amount} ({exp.description})</li>
        ))}
      </ul>
    </div>
  );
}
