import { useEffect, useState } from "react";
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

  /* ================= FETCH ADMIN DATA ================= */

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/analytics/admin", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const result = await res.json();

        // 🔥 SAFE FALLBACK (IMPORTANT)
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

  /* ================= LOADING ================= */

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading admin dashboard...</div>;
  }

  /* ================= UI ================= */

  return (
    <div className="dashboard-layout">
      <AdminSidebar />

      <div className="dashboard-main">
        <h1 className="page-title">Admin Control Center</h1>

        <p className="dashboard-sub">
          Manage tests, monitor students and analyze platform activity.
        </p>

        {/* ================= STATS ================= */}

        <div className="admin-grid">
          <div className="admin-card">
            <h3>Total Tests</h3>
            <p>{data.totalTests}</p>
          </div>

          <div className="admin-card">
            <h3>Total Students</h3>
            <p>{data.totalStudents}</p>
          </div>

          <div className="admin-card">
            <h3>Avg Score</h3>
            <p>{Math.round(data.avgScore)}</p>
          </div>

          <div className="admin-card">
            <h3>Total Violations</h3>
            <p>{data.totalViolations}</p>
          </div>
        </div>

        {/* ================= STUDENT TABLE ================= */}

        <h2 className="section-title">Student Performance</h2>

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Tests</th>
                <th>Avg Score</th>
              </tr>
            </thead>

            <tbody>
              {data.students.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No student data available
                  </td>
                </tr>
              ) : (
                data.students.map((s, i) => (
                  <tr key={i}>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.tests}</td>
                    <td>{s.avgScore}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ================= RECENT RESULTS ================= */}

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
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No recent activity
                  </td>
                </tr>
              ) : (
                data.recentResults.map((r, i) => (
                  <tr key={i}>
                    <td>{r.userId?.name || "Unknown"}</td>
                    <td>{r.score}</td>
                    <td>{r.module}</td>
                    <td>
                      {r.createdAt
                        ? new Date(r.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;