import { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { useNavigate } from "react-router-dom";
import { Award, Clock, FileText, CheckCircle, TrendingUp } from "lucide-react"; // npm install lucide-react
import "../styles/dashboard.css";

export default function StudentDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [testRes, analyticsRes] = await Promise.all([
        fetch(`${process.env.REACT_APP_API_URL}/api/tests`, { headers }),
        fetch(`${process.env.REACT_APP_API_URL}/api/analytics/student`, { headers })
      ]);

      const testData = await testRes.json();
      const analyticsData = await analyticsRes.json();

      setTests(testData.filter((t) => t.isPublished));
      setAnalytics(analyticsData);
    } catch (err) {
      console.error(err);
      setAnalytics({ totalTests: 0, avgScore: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="loading-container">
        <div className="pulse-loader"></div>
        <p>Analyzing your performance...</p>
      </div>
    </div>
  );

  const recent = analytics?.recentResults || [];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        {/* WELCOME HEADER */}
        <header className="dashboard-header">
          <div className="header-content">
            <h1>Student Dashboard</h1>
            <p>Welcome back! Here's an overview of your placement readiness.</p>
          </div>
          <div className="current-date">
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </header>

        {/* OVERVIEW STATS */}
        <div className="stats-grid">
          <div className="stat-card blue">
            <div className="stat-icon"><CheckCircle /></div>
            <div className="stat-info">
              <h3>{analytics.totalTests}</h3>
              <label>Tests Taken</label>
            </div>
          </div>
          <div className="stat-card green">
            <div className="stat-icon"><TrendingUp /></div>
            <div className="stat-info">
              <h3>{analytics.avgScore}%</h3>
              <label>Avg. Score</label>
            </div>
          </div>
          <div className="stat-card purple">
            <div className="stat-icon"><Award /></div>
            <div className="stat-info">
              <h3>{recent.length ? Math.max(...recent.map(r => r.score)) : 0}%</h3>
              <label>Personal Best</label>
            </div>
          </div>
        </div>

        <div className="dashboard-content-grid">
          {/* RECENT PERFORMANCE TABLE */}
          <div className="dashboard-card section-table">
            <div className="card-header">
              <h2>Recent Results</h2>
            </div>
            {recent.length === 0 ? (
              <p className="empty-state">No assessments completed yet.</p>
            ) : (
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Test Name</th>
                    <th>Score</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((r, i) => (
                    <tr key={i}>
                      <td className="font-semibold">{r.testName}</td>
                      <td>
                        <span className={`score-pill ${r.score >= 70 ? 'high' : r.score >= 40 ? 'mid' : 'low'}`}>
                          {r.score}%
                        </span>
                      </td>
                      <td className="text-muted">{new Date(r.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* MODULE BARS */}
          <div className="dashboard-card module-section">
            <div className="card-header">
              <h2>Skill Proficiency</h2>
            </div>
            <div className="module-list">
              {analytics.moduleStats && Object.entries(analytics.moduleStats).map(([module, value]) => (
                <div className="module-item" key={module}>
                  <div className="module-info">
                    <span className="module-name">{module}</span>
                    <span className="module-val">{value}%</span>
                  </div>
                  <div className="progress-bg">
                    <div className="progress-fill" style={{ width: `${value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AVAILABLE ASSESSMENTS */}
        <div className="test-showcase">
          <h2 className="section-title">Available Assessments</h2>
          <div className="test-grid">
            {tests.map((t) => (
              <div className="test-item-card" key={t._id}>
                <div className="test-badge">{t.module || t.company || "General"}</div>
                <h3>{t.name}</h3>
                <div className="test-meta">
                  <span><Clock size={14}/> {t.duration}m</span>
                  <span><FileText size={14}/> {t.questions?.length || 0} Qs</span>
                </div>
                <button className="btn-start" onClick={() => navigate(`/test/start/${t._id}`)}>
                  Begin Assessment
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}