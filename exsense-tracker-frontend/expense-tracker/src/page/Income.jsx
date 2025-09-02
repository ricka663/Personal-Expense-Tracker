import { useEffect, useState } from "react";
import api from "../api";

export default function Income() {
  const [incomes, setIncomes] = useState([]);
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    api.get("/incomes").then((res) => setIncomes(res.data));
  }, []);

  const addIncome = async (e) => {
    e.preventDefault();
    const res = await api.post("/incomes", { amount, source, description, date: new Date() });
    setIncomes([...incomes, res.data]);
    setAmount("");
    setSource("");
    setDescription("");
  };

  return (
    <div>
      <h2>Revenus</h2>
      <form onSubmit={addIncome}>
        <input type="number" placeholder="Montant" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <input type="text" placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {incomes.map((inc) => (
          <li key={inc.id}>{inc.source} - {inc.amount} ({inc.description})</li>
        ))}
      </ul>
    </div>
  );
}
