import { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/Sidebar";

import ThemeToggle from "../components/dashboard/ThemeToggle";
import StatCard from "../components/dashboard/StatCard";
import TestInfoModal from "../components/dashboard/TestInfoModal";

import ScoreTrendChart from "../components/dashboard/ScoreTrendChart";
import ModulePerformanceChart from "../components/dashboard/ModulePerformanceChart";
import PlacementRadar from "../components/dashboard/PlacementRadar";

import WeakAreasCard from "../components/dashboard/WeakAreasCard";
import Leaderboard from "../components/dashboard/Leaderboard";
import ProgressRing from "../components/dashboard/ProgressRing";

import { getPublishedTests } from "../data/testStore";
import { useNavigate } from "react-router-dom";

import "../styles/dashboard.css";

export default function StudentDashboard({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [tests, setTests] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const navigate = useNavigate();

  const toggleTheme = () => setDarkMode(!darkMode);

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/analytics/student", {
          headers: {
            Authorization: token,
          },
        });

        const data = await res.json();
        setAnalytics(data);
      } catch (err) {
        console.error("Error fetching analytics", err);
      }
    };

    fetchData();

    const data = getPublishedTests();
    setTests(data);
  }, []);

  /* ================= CHILD PAGE MODE ================= */

  if (children) {
    return (
      <div className={`dashboard-layout ${darkMode ? "dark" : "light"}`}>
        <Sidebar />
        <div className="dashboard-main">{children}</div>
      </div>
    );
  }

  /* ================= LOADING ================= */

  if (!analytics) {
    return <div style={{ padding: "20px" }}>Loading dashboard...</div>;
  }

  /* ================= DERIVED DATA ================= */

  let strongest = "-";
  let weakest = "-";

  if (analytics.moduleStats) {
    const modules = Object.entries(analytics.moduleStats);

    const sorted = modules.sort(
      (a, b) =>
        b[1].total / b[1].count - a[1].total / a[1].count
    );

    strongest = sorted[0]?.[0];
    weakest = sorted[sorted.length - 1]?.[0];
  }

  const readinessScore = Math.round(
    analytics.avgScore * 0.5 +
      analytics.avgAccuracy * 0.3 +
      20
  );

  const scoreTrend =
    analytics.recentResults?.map((r, i) => ({
      test: `Test ${i + 1}`,
      score: r.score,
    })) || [];

  const modulePerformance = analytics.moduleStats
    ? Object.keys(analytics.moduleStats).map((module) => ({
        module,
        accuracy:
          analytics.moduleStats[module].total /
          analytics.moduleStats[module].count,
      }))
    : [];

  const radarData = modulePerformance.map((m) => ({
    subject: m.module,
    score: m.accuracy,
  }));

  const weakAreas =
    analytics.recentResults?.[0]?.topics
      ?.filter((t) => t.correct / t.total < 0.5)
      .map((t) => ({
        topic: t.name,
        module: "Mixed",
      })) || [];

  /* ================= UI ================= */

  return (
    <div className={`dashboard-layout ${darkMode ? "dark" : "light"}`}>
      <Sidebar />

      <div className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h1 className="page-title">Student Dashboard</h1>
            <p>Track placement readiness and performance analytics</p>
          </div>

          <div className="header-right">
            <div className="readiness-card">
              <h4>Placement Readiness</h4>
              <ProgressRing score={readinessScore} />
            </div>

            <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
          </div>
        </div>

        {/* ================= STATS ================= */}

        <div className="stats-grid">
          <StatCard
            title="Tests Taken"
            value={analytics.totalTests}
            icon="📘"
          />
          <StatCard
            title="Accuracy"
            value={`${Math.round(analytics.avgAccuracy)}%`}
            icon="🎯"
          />
          <StatCard title="Strongest" value={strongest} icon="🔥" />
          <StatCard title="Weak Area" value={weakest} icon="⚠️" />
        </div>

        {/* ================= CHARTS ================= */}

        <div className="charts-grid">
          <ScoreTrendChart data={scoreTrend} />
          <ModulePerformanceChart data={modulePerformance} />
          <PlacementRadar data={radarData} />
        </div>

        {/* ================= TESTS ================= */}

        <h2 className="section-title">Available Tests</h2>

        <div className="test-grid">
          {tests.length === 0 ? (
            <div className="empty-state">
              <h3>No Tests Available</h3>
              <p>Admin has not published any tests yet.</p>
            </div>
          ) : (
            tests.map((test) => (
              <div className="test-card" key={test.id}>
                <div className="test-card-header">
                  <h3>{test.name}</h3>
                  <span className="difficulty">{test.difficulty}</span>
                </div>

                <div className="test-meta">
                  <p>📘 Module: {test.module}</p>
                  <p>📂 Topic: {test.topic}</p>
                  <p>⏱ Duration: {test.duration} mins</p>
                  <p>📝 Questions: {test.questions?.length || 0}</p>
                </div>

                <button
                  className="start-btn"
                  onClick={() =>
                    navigate(`/test/${test.module}/${test.topic}`)
                  }
                >
                  Start Test
                </button>
              </div>
            ))
          )}
        </div>

        {/* ================= BOTTOM ================= */}

        <div className="bottom-grid">
          <WeakAreasCard weakAreas={weakAreas} />
          <Leaderboard />
        </div>
      </div>

      <TestInfoModal
        test={selectedTest}
        close={() => setSelectedTest(null)}
      />
    </div>
  );
}