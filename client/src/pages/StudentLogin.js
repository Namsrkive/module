import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function StudentLogin() {
  const navigate = useNavigate();

  return (
    <div className="auth-wrapper student-auth">
      {/* LEFT PANEL */}
      <div className="auth-left">
        <h1>Welcome Back, Future Achiever</h1>
        <p>
          Track your readiness, simulate real company exams, and level up your
          placement preparation.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <motion.div
        className="auth-card glass-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Student Login</h2>

        <div className="input-group">
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
        </div>

        <button
          className="primary-btn large"
          onClick={() => navigate("/dashboard/student")}
        >
          Login
        </button>

        <p className="auth-footer">
          Don’t have an account? <span>Contact your institution</span>
        </p>
      </motion.div>
    </div>
  );
}

export default StudentLogin;