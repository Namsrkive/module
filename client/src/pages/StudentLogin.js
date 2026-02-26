import { useState } from "react";
import { useNavigate } from "react-router-dom";
 
function StudentLogin() {
  const navigate = useNavigate();
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const handleLogin = (e) => {
    e.preventDefault();
 
    if (email && password) {
      // Temporary login until backend is built
      navigate("/dashboard/student");
    }
  };
 
  return (
<div className="login-wrapper">
<div className="login-card">
<h2>Student Login</h2>
<p>Access your placement dashboard</p>
 
        <form onSubmit={handleLogin}>
<div className="input-group">
<input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
</div>
 
          <div className="input-group">
<input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
</div>
 
          <button className="login-btn" type="submit">
            Login
</button>
</form>
</div>
</div>
  );
}
 
export default StudentLogin;