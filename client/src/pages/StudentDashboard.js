import { useNavigate } from "react-router-dom";
 
function StudentDashboard() {
  const navigate = useNavigate();
 
  return (
<div className="dashboard-layout">
      {/* Sidebar */}
<div className="sidebar">
<h3>Student Panel</h3>
<div className="sidebar-item">Dashboard</div>
<div className="sidebar-item">Module Tests</div>
<div className="sidebar-item">Company Mocks</div>
<div className="sidebar-item">Results</div>
<div className="sidebar-item">Profile</div>
</div>
 
      {/* Main Content */}
<div className="dashboard-content">
<h1 style={{ marginBottom: "30px" }}>
          Welcome Back 👋
</h1>
 
        <div className="stats-grid">
<div className="stat-card">
<h3>12</h3>
<p>Total Tests</p>
</div>
<div className="stat-card">
<h3>78%</h3>
<p>Average Score</p>
</div>
<div className="stat-card">
<h3>DSA</h3>
<p>Strongest Area</p>
</div>
</div>
 
        <h2 style={{ marginBottom: "20px" }}>Module Tests</h2>
<div className="card-grid">
<div className="card" onClick={() => navigate("/test")}>Aptitude</div>
<div className="card" onClick={() => navigate("/test")}>DSA</div>
<div className="card" onClick={() => navigate("/test")}>DBMS</div>
<div className="card" onClick={() => navigate("/test")}>Programming</div>
</div>
</div>
</div>
  );
}
 
export default StudentDashboard;