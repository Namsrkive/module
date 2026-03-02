import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
 
function StudentRegister() {
  const navigate = useNavigate();
 
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
 
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.placeholder]: e.target.value,
    });
  };
 
  const handleRegister = () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
 
    console.log("Register Data:", form);
 
    // Later connect backend here
 
    navigate("/dashboard/student");
  };
 
  return (
<div className="auth-wrapper student-auth">
      {/* LEFT PANEL */}
<div className="auth-left">
<h1>Begin Your Placement Journey</h1>
<p>
          Create your account to access simulated company assessments,
          performance analytics, and AI-monitored practice sessions.
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
            placeholder="Full Name"
            onChange={handleChange}
          />
<input
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
          />
<input
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
<input
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
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