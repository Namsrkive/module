import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function AdminLogin() {
  const navigate = useNavigate();

  return (
    <div className="auth-wrapper admin-auth">
      <div className="auth-left">
        <h1>Institution Control Center</h1>
        <p>
          Manage assessments, monitor integrity logs, and analyze cohort
          readiness with precision.
        </p>
      </div>

      <motion.div
        className="auth-card glass-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Admin Login</h2>

        <div className="input-group">
          <input type="email" placeholder="Admin Email" />
          <input type="password" placeholder="Password" />
        </div>

        <button
          className="primary-btn admin-btn large"
          onClick={() => navigate("/dashboard/admin")}
        >
          Login
        </button>

        <p className="auth-footer">
          Authorized access only
        </p>
      </motion.div>
    </div>
  );
}

export default AdminLogin;