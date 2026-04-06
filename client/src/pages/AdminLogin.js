import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

function AdminLogin() {

const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [remember, setRemember] = useState(false);
const [loading, setLoading] = useState(false);

/* ================= LOGIN ================= */

const handleLogin = async () => {

if (!email || !password) {
  toast.error("Please enter admin credentials");
  return;
}

try {
  setLoading(true);

  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    toast.error(data.msg || "Login failed");
    return;
  }

  // 🔥 STRICT ADMIN CHECK
  if (!data.user || data.user.role !== "admin") {
    toast.error("Access denied. Not an admin account.");
    return;
  }

  /* ✅ SAVE SESSION */
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("role", "admin");

  if (remember) {
    localStorage.setItem("rememberAdmin", email);
  }

  toast.success("Admin Login Successful 🛡️");

  navigate("/dashboard/admin");

} catch (err) {
  console.error(err);
  toast.error("Server error");
} finally {
  setLoading(false);
}

};

return (

<div className="auth-wrapper admin-auth">

  {/* LEFT PANEL */}
  <div className="auth-left">
    <h1>Institution Control Center</h1>
    <p>
      Secure access for authorized institutional administrators.
      Manage assessments, monitor integrity logs, and analyze
      placement readiness analytics.
    </p>
  </div>

  {/* RIGHT PANEL */}
  <motion.div
    className="auth-card glass-card"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: .4 }}
  >

    <h2>Admin Login</h2>

    <div className="input-group">

      <input
        type="email"
        placeholder="Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="password-wrapper">

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <span
          className="toggle-eye"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "👁️" : "👁️‍🗨️"}
        </span>

      </div>

    </div>

    <div className="auth-options">

      <label className="remember-box">
        <input
          type="checkbox"
          checked={remember}
          onChange={() => setRemember(!remember)}
        />
        Remember Me
      </label>

    </div>

    <button
      className="primary-btn admin-btn large"
      onClick={handleLogin}
      disabled={loading}
    >
      {loading ? "Logging in..." : "Login"}
    </button>

    <p className="auth-footer secure-note">
      Admin access only.
    </p>

  </motion.div>

</div>

);
}

export default AdminLogin;