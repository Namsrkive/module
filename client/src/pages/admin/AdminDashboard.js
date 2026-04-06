import { useEffect, useState } from "react";
import { Users, FileText, Activity, AlertTriangle, Search, ChevronLeft, ChevronRight } from "lucide-react"; 
import AdminSidebar from "../../components/admin/AdminSidebar";
import "../../styles/dashboard.css";

function AdminDashboard() {
  const [data, setData] = useState({
    totalTests: 0,
    totalStudents: 0,
    avgScore: 0,
    totalViolations: 0,
    students: [],
    recentResults: []
  });

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 5;

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/analytics/admin`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const result = await res.json();

        setData({
          totalTests: result.totalTests || 0,
          totalStudents: result.totalStudents || 0,
          avgScore: result.avgScore || 0,
          totalViolations: result.totalViolations || 0,
          students: result.students || [],
          recentResults: result.recentResults || []
        });
      } catch (err) {
        console.error("Error fetching admin data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  const filteredStudents = data.students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedStudents = filteredStudents.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filteredStudents.length / perPage);

  if (loading) return <div className="loading-state">Loading Command Center...</div>;

  return (
    <div className="dashboard-layout">
      <AdminSidebar />

      <div className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1 className="page-title">Admin Control Center</h1>
            <p className="dashboard-sub">System-wide overview and student performance tracking.</p>
          </div>
          <div className="header-date">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
        </header>

        {/* ================= STATS GRID ================= */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon tests"><FileText size={20} /></div>
            <div className="stat-info">
              <label>Total Tests</label>
              <h3>{data.totalTests}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon students"><Users size={20} /></div>
            <div className="stat-info">
              <label>Total Students</label>
              <h3>{data.totalStudents}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon scores"><Activity size={20} /></div>
            <div className="stat-info">
              <label>Avg. Score</label>
              <h3>{Math.round(data.avgScore)}%</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon alerts"><AlertTriangle size={20} /></div>
            <div className="stat-info">
              <label>Violations</label>
              <h3 className={data.totalViolations > 0 ? "text-danger" : ""}>{data.totalViolations}</h3>
            </div>
          </div>
        </div>

        <div className="dashboard-content-area">
          {/* ================= LEFT COLUMN: TABLES ================= */}
          <div className="content-left">
            <section className="table-section">
              <div className="section-header">
                <h2 className="section-title">Student Performance</h2>
                <div className="search-wrapper">
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search student..."
                    className="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Email</th>
                      <th>Tests</th>
                      <th>Avg Score</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedStudents.length === 0 ? (
                      <tr><td colSpan="5" className="empty-row">No records found</td></tr>
                    ) : (
                      paginatedStudents.map((s, i) => (
                        <tr key={i}>
                          <td className="font-bold">{s.name}</td>
                          <td className="text-muted">{s.email}</td>
                          <td>{s.tests}</td>
                          <td>
                            <span className={`score-pill ${s.avgScore > 70 ? "high" : s.avgScore > 40 ? "mid" : "low"}`}>
                              {s.avgScore}%
                            </span>
                          </td>
                          <td><button className="btn-view-link">View Profile</button></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}><ChevronLeft size={16}/></button>
                  <span>Page {page} of {totalPages}</span>
                  <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages}><ChevronRight size={16}/></button>
                </div>
              )}
            </section>

            <section className="table-section mt-4">
              <h2 className="section-title">Recent Test Activity</h2>
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Score</th>
                      <th>Module</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentResults.length === 0 ? (
                      <tr><td colSpan="4" className="empty-row">No recent activity</td></tr>
                    ) : (
                      data.recentResults.map((r, i) => (
                        <tr key={i}>
                          <td>{r.user?.name || "Unknown"}</td>
                          <td className="font-bold">{r.score}%</td>
                          <td><span className="module-tag">{r.module || 'General'}</span></td>
                          <td className="text-muted">{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "-"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* ================= RIGHT COLUMN: TOP PERFORMERS ================= */}
          <aside className="content-right">
            <div className="performers-card">
              <h2 className="section-title">Top Performers</h2>
              <div className="performers-list">
                {data.students.sort((a, b) => b.avgScore - a.avgScore).slice(0, 5).map((s, i) => (
                  <div className="performer-item" key={i}>
                    <div className="performer-rank">{i + 1}</div>
                    <div className="performer-info">
                      <p className="performer-name">{s.name}</p>
                      <p className="performer-sub">{s.tests} Tests completed</p>
                    </div>
                    <div className="performer-score">{s.avgScore}%</div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;