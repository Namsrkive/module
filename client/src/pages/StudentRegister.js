import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

function StudentRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  /* -------- Password Strength -------- */
  const getStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return "Strong";
    return "Medium";
  };

  const strength = getStrength(form.password);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    toast.success("Registration Successful 🎉");
    setTimeout(() => {
      navigate("/login/student");
    }, 1200);
  };

  return (
    <div className="auth-wrapper student-auth">
      {/* LEFT PANEL */}
      <div className="auth-left">
        <h1>Begin Your Placement Journey</h1>
        <p>
          Create your account to access AI-powered assessments and analytics.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <motion.div
        className="auth-card glass-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Student Registration</h2>

        <div className="input-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <span
              className="toggle-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
        </div>

        {/* Password Strength Indicator */}
        <div className={`password-strength ${strength.toLowerCase()}`}>
          Strength: {strength}
        </div>

        <button
          className="primary-btn large"
          onClick={handleRegister}
        >
          Create Account
        </button>

        <p className="auth-footer">
          Already registered?{" "}
          <span onClick={() => navigate("/login/student")}>
            Login here
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default StudentRegister;