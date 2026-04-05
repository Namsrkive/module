import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Added for consistency with your other pages
import "../styles/result.css";

function TestResult() {
  const navigate = useNavigate();
  const location = useLocation();

  // Safely get result from state or localStorage
  const result = location.state || JSON.parse(localStorage.getItem("latestResult"));

  // FIX: Added proper JSX return for the error state
  if (!result) {
    return (
      <div className="result-container">
        <div className="result-card">
          <h2>No Result Found</h2>
          <button onClick={() => navigate("/dashboard/student")}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { score, total, percentage, testTitle, date, module, topic } = result;
  const passed = percentage >= 60;

  return (
    // FIX: Wrapped everything in a single parent div
    <div className="result-container">
      <motion.div 
        className="result-card glass-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>{testTitle}</h2>
        <p className="date">{date}</p>

        <div className="score-section">
          <h1>{score} / {total}</h1>
          <h3 className={passed ? "pass-text" : "fail-text"}>
            {passed ? "PASS ✅" : "FAIL ❌"}
          </h3>
        </div>

        <div className="progress-container">
          <div className="progress-bar">
            <motion.div
              className={`progress-fill ${passed ? "bg-success" : "bg-danger"}`}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            ></motion.div>
          </div>
          <p className="percentage-label">{percentage}%</p>
        </div>

        <div className="result-actions">
          <button 
            className="secondary-btn" 
            onClick={() => navigate("/dashboard/student")}
          >
            Go to Dashboard
          </button>

          <button
            className="primary-btn"
            onClick={() => navigate(`/test/${module}/${topic}`)}
          >
            Retake Test
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default TestResult;