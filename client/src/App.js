import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
 
import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import StudentDashboard from "./pages/StudentDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
 
function Layout() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
 
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);
 
  return (
<>
<div className="navbar">
<div className="nav-left">
<div className="nav-title" onClick={() => navigate("/")}>
            Placement Portal
</div>
</div>
 
        <div className="nav-center">
<span onClick={() => navigate("/")}>Home</span>
<span onClick={() => navigate("/about")}>About</span>
<span onClick={() => navigate("/contact")}>Contact</span>
</div>
 
        <div className="nav-right">
<button onClick={() => navigate("/login/student")}>
            Student Login
</button>
 
          <button
            className="secondary-btn"
            onClick={() => navigate("/login/admin")}
>
            Admin
</button>
 
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
>
            {darkMode ? "☀" : "🌙"}
</button>
</div>
</div>
 
      <Routes>
<Route path="/" element={<Home />} />
<Route path="/login/student" element={<StudentLogin />} />
<Route path="/login/admin" element={<AdminLogin />} />
<Route path="/dashboard/student" element={<StudentDashboard />} />
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
</Routes>
</>
  );
}
 
function App() {
  return (
<Router>
<Layout />
</Router>
  );
}
 
export default App;