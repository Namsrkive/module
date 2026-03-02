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
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");

  /* ---------- LOGIN ---------- */
  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    // simulate email verification required
    setShowOTP(true);
    toast("Verification code sent to your email 📩");
  };

  /* ---------- VERIFY OTP ---------- */
  const handleVerifyOTP = () => {
    if (otp === "123456") {
      toast.success("Login Successful 🚀");

      if (remember) {
        localStorage.setItem("rememberUser", email);
      }

      // role-based redirect
      localStorage.setItem("role", "student");
      navigate("/dashboard/student");
    } else {
      toast.error("Invalid OTP");
    }
  };

  const resendOTP = () => {
    toast.success("Verification email resent 📩");
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
          Secure login with email verification and performance tracking.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <motion.div
        className="auth-card glass-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Student Login</h2>

        {!showOTP ? (
          <>
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
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="auth-options">
              <label>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                Remember Me
              </label>

              <span className="forgot-link" onClick={forgotPassword}>
                Forgot Password?
              </span>
            </div>

            <button className="primary-btn large" onClick={handleLogin}>
              Login
            </button>
          </>
        ) : (
          <>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <button className="primary-btn large" onClick={handleVerifyOTP}>
              Verify OTP
            </button>

            <p className="resend-link" onClick={resendOTP}>
              Resend Verification Email
            </p>
          </>
        )}

        <p className="auth-footer">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register/student")}>
            Register here
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default StudentLogin;