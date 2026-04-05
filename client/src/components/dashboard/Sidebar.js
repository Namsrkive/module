import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  // ✅ GET USER FROM LOCALSTORAGE
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="sidebar">

      <div>

        <div className="sidebar-user">
          <h2>Welcome</h2>
          <p className="student-name">
            {user?.name || "Student"}
          </p>
        </div>

        <div className="sidebar-divider"></div>

        <div className="menu">

          <NavLink to="/dashboard/student" className="menu-item">
            📊 Dashboard
          </NavLink>

          <NavLink to="/dashboard/modules" className="menu-item">
            🧠 Module Tests
          </NavLink>

          <NavLink to="/dashboard/company" className="menu-item">
            🏢 Company Mocks
          </NavLink>

          <NavLink to="/dashboard/results" className="menu-item">
            📝 Results
          </NavLink>

          <NavLink to="/dashboard/leaderboard" className="menu-item">
            🏆 Leaderboard
          </NavLink>

          <NavLink to="/dashboard/analytics" className="menu-item">
            📈 Analytics
          </NavLink>

        </div>

      </div>

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user"); // ✅ IMPORTANT
          navigate("/login/student");
        }}
      >
        Logout
      </button>

    </div>
  );
}