import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";

/* ================= NAV ITEMS ================= */

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

/* ================= LAYOUT ================= */

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  /* ---------- Dark Mode ---------- */
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  /* ---------- Route Loading Bar ---------- */
  useEffect(() => {
    NProgress.start();
    NProgress.done();
  }, [location.pathname]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <div className="navbar">
        <div className="nav-container">
          <div className="nav-title" onClick={() => navigate("/")}>
            Proctored Portal
          </div>

          <div className="nav-center">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);

              return (
                <button
                  key={item.path}
                  className={`nav-link ${isActive ? "active" : ""}`}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <button
            className="theme-toggle"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? "☀" : "🌙"}
          </button>
        </div>
      </div>

      {/* ================= PAGE TRANSITION ================= */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -40, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/login/student" element={<StudentLogin />} />
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <h4>Placement Portal</h4>
            <p>Simulated hiring. Real readiness.</p>
          </div>

          <div>
            <h4>Platform</h4>
            <p>Assessments</p>
            <p>Analytics</p>
            <p>Proctoring</p>
          </div>

          <div>
            <h4>Contact</h4>
            <p>support@placementportal.com</p>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ================= ROOT ================= */

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;