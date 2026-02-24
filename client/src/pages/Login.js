import { useState } from "react";
import { useNavigate } from "react-router-dom";
 
function Login() {
  const navigate = useNavigate();
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
 
  const handleLogin = (e) => {
    e.preventDefault();
 
    if (email && password) {
      navigate("/dashboard");
    } else {
      alert("Please fill all fields");
    }
  };
 
  return (
<div className="login-container">
<div className="login-card">
<h1 className="login-title">Placement Portal</h1>
<p className="login-subtitle">
          Smart Assessment. Real Placement Readiness.
</p>
 
        <form onSubmit={handleLogin}>
          {/* Email Field */}
<div className="input-group">
<input
              type="email"
              placeholder=" "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
<label>Email Address</label>
</div>
 
          {/* Password Field */}
<div className="input-group password-wrapper">
<input
              type={showPassword ? "text" : "password"}
              placeholder=" "
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
<label>Password</label>
 
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
>
              {showPassword ? "Hide" : "Show"}
</span>
</div>
 
          {/* Login Button */}
<button type="submit" className="login-btn">
            Login
</button>
</form>
 
        {/* Extra Section */}
<div className="login-extra">
          Don’t have an account? Create one
</div>
</div>
</div>
  );
}
 
export default Login;