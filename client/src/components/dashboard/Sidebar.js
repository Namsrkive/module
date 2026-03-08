import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
      const navigate = useNavigate();
      
  return (

    <div className="sidebar">

      <div>

        <div className="sidebar-user">

          <h2>Welcome</h2>
          <p className="student-name">NAMRATA</p>

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
      onClick={()=>{
      localStorage.removeItem("token");
      navigate("/login/student");
      }}
      >
      Logout
      </button>

    </div>

  );

}