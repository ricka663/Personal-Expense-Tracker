import { useEffect, useState } from "react";
import api from "../api";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [bars, setBars] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    api.get("/summary/monthly?month=2025-08").then((res) => setSummary(res.data));
    api.get("/summary/pie?month=2025-08").then((res) => setPieData(res.data));
    api.get("/summary/bars?from=2025-01-01&to=2025-12-31").then((res) => setBars(res.data));
    api.get("/summary/alerts").then((res) => setAlert(res.data));
  }, []);

  return (
    <div>
      <h2>Tableau de bord</h2>
      {summary && (
        <div>
          <p>Revenus: {summary.total_incomes}</p>
          <p>Dépenses: {summary.total_expenses}</p>
          <p>Balance: {summary.balance}</p>
        </div>
      )}

      {alert && <p style={{ color: alert.alert ? "red" : "green" }}>{alert.message}</p>}

      <h3>Répartition des dépenses</h3>
      <PieChart width={400} height={300}>
        <Pie data={pieData} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={100}>
          {pieData.map((entry, index) => (
            <Cell key={index} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]} />
          ))}
        </Pie>
      </PieChart>

      <h3>Dépenses mensuelles</h3>
      <BarChart width={500} height={300} data={bars}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </div>
  );
}
