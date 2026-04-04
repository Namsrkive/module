import { useLocation, useNavigate } from "react-router-dom";
import "../styles/result.css";

function TestResult() {

  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 Get result (fallback from localStorage)
  const result =
    location.state ||
    JSON.parse(localStorage.getItem("latestResult"));

  if (!result) {
    return <h2>No Result Found</h2>;
  }

  const { score, total, percentage, testTitle, date } = result;

  const passed = percentage >= 60;

  return (
    <div className="result-container">

      <div className="result-card">

        <h2>{testTitle}</h2>

        <p className="date">{date}</p>

        {/* SCORE */}
        <div className="score-section">
          <h1>{score} / {total}</h1>
          <h3 className={passed ? "pass" : "fail"}>
            {passed ? "PASS ✅" : "FAIL ❌"}
          </h3>
        </div>

        {/* PROGRESS BAR */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <p className="percentage">{percentage}%</p>

        {/* ACTIONS */}
        <div className="result-actions">

          <button onClick={() => navigate("/dashboard/student")}>
            Go to Dashboard
          </button>

          <button
            onClick={() =>
              navigate(`/test/${testTitle.toLowerCase()}`)
            }
          >
            Retake Test
          </button>

        </div>

      </div>

    </div>
  );
}

export default TestResult;