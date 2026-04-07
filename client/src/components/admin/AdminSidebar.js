import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">

      <div>

        <div className="sidebar-user">
          <h2>Admin Panel</h2>
          <p className="student-name">Assessment Control</p>
        </div>

        <div className="sidebar-divider"></div>

        <div className="menu">

          <NavLink to="/dashboard/admin" className="menu-item">
            📊 Dashboard
          </NavLink>

          <NavLink to="/admin/create-test" className="menu-item">
            ➕ Create Test
          </NavLink>

          <NavLink to="/admin/question-bank" className="menu-item">
            📚 Question Bank
          </NavLink>

          <NavLink to="/admin/test-builder" className="menu-item">
            🧩 Test Builder
          </NavLink>

          <NavLink to="/admin/manage-tests" className="menu-item">
            ⚙️ Manage Tests
          </NavLink>

          <NavLink to="/admin/results" className="menu-item">
            📊 Student Results
          </NavLink>

        </div>
      </div>

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login/admin");
        }}
      >
        Logout
      </button>

    </div>
  );
}

export default AdminSidebar;