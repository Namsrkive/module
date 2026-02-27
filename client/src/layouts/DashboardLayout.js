import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Building2,
  LogOut,
  Menu
} from "lucide-react";

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview" },
    { icon: FileText, label: "My Tests" },
    { icon: BarChart3, label: "Performance" },
    { icon: Building2, label: "Companies" }
  ];

  return (
    <div className="dashboard-layout">

      <motion.aside
        animate={{ width: collapsed ? 90 : 260 }}
        transition={{ duration: 0.35 }}
        className={`sidebar-premium ${collapsed ? "collapsed" : ""}`}
      >
        <div className="sidebar-header">
          {!collapsed && <h3>Student</h3>}
          <button
            className="collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="sidebar-item-wrapper">
                <button className="sidebar-item active">
                  <Icon size={20} />
                  {!collapsed && <span>{item.label}</span>}
                </button>

                {collapsed && (
                  <div className="sidebar-tooltip">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}

          <button
            className="sidebar-item logout"
            onClick={() => navigate("/")}
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </nav>
      </motion.aside>

      <main className="dashboard-content">
        <div className="dashboard-topbar">

  <div className="topbar-left">
    <h2>Dashboard</h2>
  </div>

  <div className="topbar-right">

    <div className="notification-bell">
      🔔
      <span className="notif-dot"></span>
    </div>

    <div className="profile-box">
      <div className="avatar">DS</div>
      <div className="profile-info">
        <strong>Dhruv Swami</strong>
        <small>Computer Science</small>
      </div>
    </div>

  </div>

</div>
        {children}
      </main>

    </div>
  );
}

export default DashboardLayout;