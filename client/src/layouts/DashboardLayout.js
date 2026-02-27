import { useNavigate } from "react-router-dom";

function DashboardLayout({ children, role }) {
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h3>{role === "admin" ? "Admin Panel" : "Student Panel"}</h3>

        <nav>
          <button onClick={() => navigate("/dashboard")}>
            Overview
          </button>

          {role === "admin" && (
            <>
              <button>Students</button>
              <button>Assessments</button>
              <button>Analytics</button>
            </>
          )}

          {role === "student" && (
            <>
              <button>My Tests</button>
              <button>Performance</button>
              <button>Company Readiness</button>
            </>
          )}

          <button onClick={() => navigate("/")}>Logout</button>
        </nav>
      </aside>

      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
