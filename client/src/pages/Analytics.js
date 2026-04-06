import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import "../styles/dashboard.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/analytics/student", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  const chartData = Object.entries(data.moduleStats || {}).map(
    ([module, score]) => ({ module, score })
  );

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <h1>Analytics</h1>

        <div className="stats">
          <div className="card">
            <h3>Total Tests</h3>
            <p>{data.totalTests}</p>
          </div>

          <div className="card">
            <h3>Avg Score</h3>
            <p>{data.avgScore}%</p>
          </div>
        </div>

        <div className="card">
          <h3>Module Performance</h3>

          <BarChart width={500} height={300} data={chartData}>
            <XAxis dataKey="module" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}