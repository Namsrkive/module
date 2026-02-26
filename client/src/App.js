import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
 
import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import StudentDashboard from "./pages/StudentDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
 
/* ---------------- LAYOUT ---------------- */
 
function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
 
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);
 
  return (
<>
      {/* NAVBAR */}
<div className="navbar">
<div className="nav-title" onClick={() => navigate("/")}>
          Placement Portal
</div>
 
        <div className="nav-center">
<span onClick={() => navigate("/")}>Home</span>
<span onClick={() => navigate("/about")}>About</span>
<span onClick={() => navigate("/contact")}>Contact</span>
</div>
 
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
>
          {darkMode ? "☀" : "🌙"}
</button>
</div>
 
      {/* PAGE TRANSITION WRAPPER */}
<AnimatePresence mode="wait">
<motion.div
    key={location.pathname}
    initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    exit={{ opacity: 0, y: -40, filter: "blur(6px)" }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
>
<Routes location={location}>
<Route path="/" element={<Home />} />
<Route path="/login/student" element={<StudentLogin />} />
<Route path="/login/admin" element={<AdminLogin />} />
<Route path="/dashboard/student" element={<StudentDashboard />} />
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
</Routes>
</motion.div>
</AnimatePresence>
</>
  );
}
 
/* ---------------- APP ROOT ---------------- */
 
function App() {
  return (
<Router>
<Layout />
</Router>
  );
}
 
export default App;