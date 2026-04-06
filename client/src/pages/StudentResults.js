import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import "../styles/dashboard.css";

export default function StudentResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("/api/analytics/student", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => setResults(data.recentResults || []));
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <h1>Results</h1>

        <div className="card">
          <h3>Test History</h3>

          {results.length === 0 ? (
            <p>No tests attempted</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Test</th>
                  <th>Score</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {results.map((r, i) => (
                  <tr key={i}>
                    <td>{r.testName}</td>
                    <td>{r.score}%</td>
                    <td>{new Date(r.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}