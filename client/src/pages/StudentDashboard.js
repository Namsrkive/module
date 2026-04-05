import { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { useNavigate } from "react-router-dom";

import "../styles/dashboard.css";

export default function StudentDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("/api/analytics/student", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setAnalytics(data);
      } catch (err) {
        console.error(err);
        setAnalytics({ totalTests: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // keep your existing tests
    const storedTests = JSON.parse(localStorage.getItem("tests")) || [];
    setTests(storedTests);
  }, []);

  if (loading) {
    return (
      <div className="dashboard-layout">
        <Sidebar />
        <div className="dashboard-main loading">Loading...</div>
      </div>
    );
  }

  const recent = analytics?.recentResults || [];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">

        {/* HEADER */}
        <div className="header">
          <h1>Dashboard</h1>
          <p>Track your progress, performance, and placement readiness</p>
        </div>

        {/* STATS */}
        <div className="stats">
          <div className="card">
            <h3>Total Tests</h3>
            <p>{analytics.totalTests}</p>
          </div>

          <div className="card">
            <h3>Average Score</h3>
            <p>{analytics.avgScore}%</p>
          </div>

          <div className="card">
            <h3>Best Score</h3>
            <p>
              {recent.length
                ? Math.max(...recent.map((r) => r.score))
                : 0}
              %
            </p>
          </div>
        </div>

        {/* RECENT RESULTS */}
        <div className="section">
          <h2>Recent Results</h2>

          {recent.length === 0 ? (
            <p className="empty">No tests attempted yet</p>
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
                {recent.map((r, i) => (
                  <tr key={i}>
                    <td>{r.testName}</td>
                    <td>{r.score}%</td>
                    <td>
                      {new Date(r.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* MODULE PERFORMANCE */}
        <div className="section">
          <h2>Module Performance</h2>

          <div className="modules">
            {analytics.moduleStats &&
              Object.entries(analytics.moduleStats).map(
                ([module, value]) => (
                  <div className="module" key={module}>
                    <span>{module}</span>

                    <div className="bar">
                      <div
                        className="fill"
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>

                    <span>{value}%</span>
                  </div>
                )
              )}
          </div>
        </div>

        {/* TESTS */}
        <div className="section">
          <h2>Available Tests</h2>

          <div className="tests">
            {tests.length === 0 ? (
              <p className="empty">No tests available</p>
            ) : (
              tests.map((t, i) => (
                <div className="test-card" key={i}>
                  <h3>{t.name}</h3>
                  <p>{t.module}</p>
                  <button
                    onClick={() =>
                      navigate(`/test/${t.module}/${t.topic}`)
                    }
                  >
                    Start Test
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}