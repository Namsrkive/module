import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

function StudentLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------- LOGIN LOGIC ---------- */
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Login failed");
        return;
      }

      // Store Auth Data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user.role);

      if (remember) {
        localStorage.setItem("rememberUser", email);
      }

      // ✅ ROLE CHECK (extra safety)
      if (data.user.role !== "student") {
        toast.error("This is not a student account");
        return;
      }


      toast.success("Login Successful 🚀");
      navigate("/dashboard/student");

    } catch (err) {
      console.error("Login Error:", err);
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = () => {
    toast("Password reset link sent to your email 🔐");
  };

  return (
    <div className="auth-wrapper student-auth">
      
      {/* LEFT PANEL */}
      <div className="auth-left">
        <h1>Welcome Back, Future Achiever</h1>
        <p>
          Secure login and track your placement readiness performance.
        </p>
      </div>

      {/* RIGHT PANEL (ANIMATED) */}
      <motion.div
        className="auth-card glass-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Student Login</h2>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email Address"
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
              style={{ cursor: "pointer" }}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>
        </div>

        {/* OPTIONS */}
        <div className="auth-options">
          <label className="remember-box">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <span className="checkmark"></span>
            Remember Me
          </label>

          <span className="forgot-link" onClick={forgotPassword}>
            Forgot Password?
          </span>
        </div>

        <button
          className="primary-btn large"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="auth-footer">
          Don’t have an account?{" "}
          <span
            className="link-span"
            onClick={() => navigate("/register/student")}
            style={{ cursor: "pointer", fontWeight: "bold" }}
          >
            Register here
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default StudentLogin;