import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function StudentDashboard({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("testHistory")) || [];
    setHistory(data);
  }, []);

  const totalTests = history.length;

  const avgScore =
    totalTests > 0
      ? (
          history.reduce(
            (sum, t) => sum + parseFloat(t.accuracy),
            0
          ) / totalTests
        ).toFixed(1)
      : 0;

  const readiness =
    totalTests > 0 ? Math.round(avgScore / 10) : 0;

  const lastTest =
    totalTests > 0 ? history[0].accuracy : "N/A";

  return (
    <div className="dashboard-container">
      <h2>Student Dashboard</h2>

      {/* Overview Cards */}
      <div className="dashboard-cards">
        <div className="dash-card">
          <h4>Total Tests</h4>
          <p>{totalTests}</p>
        </div>

        <div className="dash-card">
          <h4>Average Accuracy</h4>
          <p>{avgScore}%</p>
        </div>

        <div className="dash-card">
          <h4>Readiness Score</h4>
          <p>{readiness} / 10</p>
        </div>

        <div className="dash-card">
          <h4>Last Test</h4>
          <p>{lastTest}%</p>
        </div>
      </div>

      {/* Start Test */}
      <div className="dashboard-actions">
        <button
          className="primary-btn"
          onClick={() => navigate("/test")}
        >
          Start Practice Test
        </button>
      </div>

      {/* Test History */}
      <h3>Test History</h3>

      <div className="history-table">
        {history.length === 0 ? (
          <p>No tests attempted yet.</p>
        ) : (
          history.map((test) => (
            <div key={test.id} className="history-row">
              <div>{test.title}</div>
              <div>
                {test.totalScore}/{test.totalQuestions}
              </div>
              <div>{test.accuracy}%</div>
              <div>{test.date}</div>
              <button
                onClick={() => navigate("/test")}
              >
                Retake
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;