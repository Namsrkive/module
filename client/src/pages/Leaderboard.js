import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import "../styles/dashboard.css";

export default function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/analytics/leaderboard", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <h1>Leaderboard</h1>

        <div className="card">
          {data.map((u, i) => (
            <div key={i} className="leader-row">
              <span>#{i + 1}</span>
              <span>{u.name}</span>
              <span>{u.avgScore}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}