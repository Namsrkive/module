import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Users, FileText, TrendingUp, Search, UserCheck } from "lucide-react"; 
import "../../styles/result.css";

function StudentResults() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/analytics/admin`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="dashboard-layout">
        <AdminSidebar />
        <div className="loading-container">
          <div className="loader"></div>
          <p>Syncing Student Records...</p>
        </div>
      </div>
    );
  }

  const filteredStudents = data.students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-layout">
      <AdminSidebar />

      <div className="dashboard-main">
        <header className="page-header">
          <div className="header-text">
            <h1 className="page-title">Student Results</h1>
            <p className="dashboard-sub">Analyze performance metrics and placement readiness.</p>
          </div>
        </header>

        {/* STATS GRID */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-bg purple">
              <FileText size={20} />
            </div>
            <div className="stat-content">
              <label>Total Tests</label>
              <h3>{data.totalTests}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-bg blue">
              <Users size={20} />
            </div>
            <div className="stat-content">
              <label>Students</label>
              <h3>{data.totalStudents}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-bg green">
              <TrendingUp size={20} />
            </div>
            <div className="stat-content">
              <label>Avg. Score</label>
              <h3>{Math.round(data.avgScore)}%</h3>
            </div>
          </div>
        </div>

        {/* CONTROLS & TABLE */}
        <div className="table-section-card">
          <div className="table-header-tools">
            <div className="search-wrapper-modern">
              <Search size={18} />
              <input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Student Profile</th>
                  <th>Tests Taken</th>
                  <th>Performance Index</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="empty-table-msg">
                      No student records found matching your query.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s, i) => (
                    <tr key={i}>
                      <td>
                        <div className="student-profile-cell">
                          <div className="avatar-small">{s.name.charAt(0)}</div>
                          <div className="student-info-text">
                            <span className="student-name">{s.name}</span>
                            <span className="student-email">{s.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="test-count-badge">{s.tests} Tests</span>
                      </td>
                      <td>
                        <div className={`score-badge ${
                          s.avgScore > 70 ? "high" : s.avgScore > 40 ? "mid" : "low"
                        }`}>
                          {s.avgScore}%
                        </div>
                      </td>
                      <td>
                        <button className="btn-table-action">View Full Report</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentResults;