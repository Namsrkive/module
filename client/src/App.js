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
import About from "./pages/About";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/common/ScrollToTop";
import ThemeSwitch from "./components/common/ThemeSwitch";
import StudentRegister from "./pages/StudentRegister";
import { Toaster } from "react-hot-toast";
import "./styles/auth.css";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ModuleTests from "./pages/ModuleTests";
import CompanyMocks from "./pages/CompanyMocks";
import Leaderboard from "./pages/Leaderboard";

import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateTest from "./pages/admin/CreateTest";

import QuestionBank from "./pages/admin/QuestionBank";
import ManageTests from "./pages/admin/ManageTests";
import TestBuilder from "./pages/admin/TestBuilder";

import TestPage from "./pages/TestPage";
import TestStart from "./pages/TestStart";
import TestResult from "./pages/TestResult";
import AdminStudentResults from "./pages/admin/StudentResults";
import StudentResults from "./pages/StudentResults";
import TopicTestList from "./pages/TopicTestList";
import Analytics from "./pages/Analytics"; // student analytics
import CompanyTests from "./pages/CompanyTests";

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
  const isDashboard =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/test");

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

            <ThemeSwitch darkMode={darkMode} setDarkMode={setDarkMode} />

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
            <Route
              path="/dashboard/student"
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentDashboard
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/modules"
              element={
                <ProtectedRoute allowedRole="student">
                  <ModuleTests />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/company"
              element={
                <ProtectedRoute allowedRole="student">
                  <CompanyMocks />
                </ProtectedRoute>
              }
            />

            <Route
            path="/dashboard/admin"
            element={
            <ProtectedRoute allowedRole="admin">
            <AdminDashboard/>
            </ProtectedRoute>
            }
            />

            <Route
            path="/admin/create-test"
            element={
            <ProtectedRoute allowedRole="admin">
            <CreateTest/>
            </ProtectedRoute>
            }
            />
            
            <Route
            path="/admin/question-bank"
            element={
            <ProtectedRoute allowedRole="admin">
            <QuestionBank/>
            </ProtectedRoute>
            }
            />

            <Route
            path="/admin/manage-tests"
            element={
            <ProtectedRoute allowedRole="admin">
            <ManageTests/>
            </ProtectedRoute>
            }
            />
            
            <Route
            path="/admin/test-builder"
            element={
            <ProtectedRoute allowedRole="admin">
            <TestBuilder/>
            </ProtectedRoute>
            }
            />

            <Route
            path="/admin/results"
            element={
            <ProtectedRoute allowedRole="admin">
            <AdminStudentResults/>
            </ProtectedRoute>
            }
            />
            <Route
            path="/admin/analytics"
            element={
            <ProtectedRoute allowedRole="admin">
            <Analytics/>
            </ProtectedRoute>
            }
            />
            <Route
  path="/dashboard/results"
  element={
    <ProtectedRoute allowedRole="student">
      <StudentResults />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard/analytics"
  element={
    <ProtectedRoute allowedRole="student">
      <Analytics />   {/* ✅ THIS ONE (pages/Analytics.js) */}
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard/leaderboard"
  element={
    <ProtectedRoute allowedRole="student">
      <Leaderboard />
    </ProtectedRoute>
  }
/>
<Route path="/tests/company/:companyId" element={<CompanyTests />} />
            <Route path="/tests/topic/:topicId" element={<TopicTestList />} />
            <Route path="/test/start/:testId" element={<TestStart />} />
            <Route path="/test/:testId" element={<TestPage />} />
 
            <Route path="/test-result" element={<TestResult />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register/student" element={<StudentRegister />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      {/* ================= FOOTER ================= */}
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
              <span>India | KRMU </span>
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
    </>
  );
}

/* ================= ROOT ================= */

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-right" reverseOrder={false} />
      <Layout />
    </Router>
  );
}

export default App;