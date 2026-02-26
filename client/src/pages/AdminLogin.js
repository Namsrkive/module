import { useState } from "react";
 
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      alert("Admin login (backend coming next)");
    }
  };
 
  return (
<div className="login-wrapper">
<div className="login-card">
<h2>Admin Login</h2>
<p>Manage tests and monitor performance</p>
 
        <form onSubmit={handleLogin}>
<div className="input-group">
<input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
</div>
 
          <div className="input-group">
<input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
</div>
 
          <button className="login-btn">Login as Admin</button>
</form>
</div>
</div>
  );
}
 
export default AdminLogin;