import { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboard/Sidebar";
import "../styles/leaderboard.css";

function AnalyticsPage() {

  const [stats, setStats] = useState({
    totalTests: 0,
    avgScore: 0,
    bestScore: 0,
    passRate: 0,
    scores: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("results");

    // 🔥 SAFE PARSE
    let results = [];
    try {
      results = stored ? JSON.parse(stored) : [];
    } catch (e) {
      results = [];
    }

    if (!results || results.length === 0) {
      setLoading(false);
      return;
    }

    const totalTests = results.length;

    let totalScore = 0;
    let bestScore = 0;
    let passCount = 0;

    const scores = [];

    results.forEach(r => {
      const percent = Number(r.percentage) || 0;

      totalScore += percent;
      scores.push(percent);

      if (percent > bestScore) bestScore = percent;
      if (percent >= 60) passCount++;
    });

    const avgScore = Math.round(totalScore / totalTests);
    const passRate = Math.round((passCount / totalTests) * 100);

    setStats({
      totalTests,
      avgScore,
      bestScore,
      passRate,
      scores
    });

    setLoading(false);

  }, []);

  return (
    <DashboardLayout>

      <div className="analytics-page">

        <h2>Performance Analytics</h2>

        {/* 🔥 LOADING */}
        {loading ? (
          <p style={{ marginTop: "40px", color: "#777" }}>
            Loading analytics...
          </p>
        ) : stats.totalTests === 0 ? (
          /* 🔥 EMPTY STATE */
          <p style={{ marginTop: "40px", color: "#777" }}>
            No test data available. Attempt a test first.
          </p>
        ) : (
          <>
            {/* STATS */}
            <div className="stats-grid">

              <div className="stat-card">
                <h3>{stats.totalTests}</h3>
                <p>Total Tests</p>
              </div>

              <div className="stat-card">
                <h3>{stats.avgScore}%</h3>
                <p>Average Score</p>
              </div>

              <div className="stat-card">
                <h3>{stats.bestScore}%</h3>
                <p>Best Score</p>
              </div>

              <div className="stat-card">
                <h3>{stats.passRate}%</h3>
                <p>Pass Rate</p>
              </div>

            </div>

            {/* CHART */}
            <div className="chart-container">

              <h3>Performance Trend</h3>

              <div className="chart">
                {stats.scores.map((score, i) => (
                  <div key={i} className="bar-wrapper">
                    <div
                      className="bar"
                      style={{ height: `${score}%` }}
                    ></div>
                    <span>{score}</span>
                  </div>
                ))}
              </div>

            </div>
          </>
        )}

      </div>

    </DashboardLayout>
  );
}

export default AnalyticsPage;