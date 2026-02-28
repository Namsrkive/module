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
import { Link } from "react-router-dom";

import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";

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
  const isDashboard = location.pathname.startsWith("/dashboard");

  /* ---------- Dark Mode ---------- */
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
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
      {!isDashboard && (
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

            <div
              className={`theme-switch ${darkMode ? "active" : ""}`}
              onClick={() => setDarkMode((prev) => !prev)}
            >
              <div className="switch-thumb" />
            </div>
          </div>
        </div>
      )}

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
      {!isDashboard && (
        <footer className="footer-enterprise">

          <div className="footer-gradient-line" />

          <div className="footer-container">

            <div className="footer-brand">
              <h3>Proctored Portal</h3>
              <p>
                Institutional-grade placement analytics and AI-powered
                proctoring infrastructure engineered for academic excellence.
              </p>

              <div className="footer-socials">
                <span>LinkedIn</span>
                <span>Twitter</span>
                <span>GitHub</span>
              </div>
            </div>

            <div className="footer-col">
              <h4>Platform</h4>
              <Link to="/">Assessments</Link>
              <Link to="/">Analytics</Link>
              <Link to="/">AI Proctoring</Link>
              <Link to="/">Company Simulation</Link>
            </div>

            <div className="footer-col">
              <h4>Institution</h4>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/login/admin">Admin Portal</Link>
              <Link to="/login/student">Student Portal</Link>
            </div>

            <div className="footer-col">
              <h4>Support</h4>
              <span>support@placementportal.com</span>
              <span>Mon – Fri | 09:00 – 18:00 IST</span>
              <span>India | Global Deployment</span>
            </div>

          </div>

          <div className="footer-bottom">
            <div>
              © 2026 Proctored Placement Portal
            </div>
            <div className="footer-legal">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Security</span>
            </div>
          </div>

        </footer>
      )}
    </>
  );
}

/* ================= ROOT ================= */

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout />
    </Router>
  );
}

export default App;