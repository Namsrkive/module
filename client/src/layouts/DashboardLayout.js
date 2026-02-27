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

  return (
    <div className="dashboard-layout">

      <motion.aside
        animate={{ width: collapsed ? 80 : 260 }}
        transition={{ duration: 0.3 }}
        className="sidebar-premium"
      >
        <div className="sidebar-header">
          {!collapsed && <h3>Student</h3>}
          <button onClick={() => setCollapsed(!collapsed)}>
            <Menu size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">

          <button className="sidebar-item active">
            <LayoutDashboard size={18} />
            {!collapsed && <span>Overview</span>}
          </button>

          <button className="sidebar-item">
            <FileText size={18} />
            {!collapsed && <span>My Tests</span>}
          </button>

          <button className="sidebar-item">
            <BarChart3 size={18} />
            {!collapsed && <span>Performance</span>}
          </button>

          <button className="sidebar-item">
            <Building2 size={18} />
            {!collapsed && <span>Companies</span>}
          </button>

          <button
            className="sidebar-item logout"
            onClick={() => navigate("/")}
          >
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>

        </nav>
      </motion.aside>

      <main className="dashboard-content">
        {children}
      </main>

    </div>
  );
}

export default DashboardLayout;