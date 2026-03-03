import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function TestResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const { totalScore = 0, sectionScores = [] } =
    location.state || {};

  const totalQuestions = sectionScores.reduce(
    (sum, sec) => sum + sec.total,
    0
  );

  const accuracy =
    totalQuestions > 0
      ? ((totalScore / totalQuestions) * 100).toFixed(1)
      : 0;

  /* ================= PERFORMANCE LABEL ================= */
  const getPerformanceLabel = () => {
    if (accuracy >= 85) return "Excellent";
    if (accuracy >= 70) return "Good";
    if (accuracy >= 50) return "Average";
    return "Needs Improvement";
  };

  const performance = getPerformanceLabel();

  /* ================= READINESS SCORE ================= */
  const readinessScore = Math.round(
    (accuracy / 100) * 10
  ); // Scale of 10

  const saveAttempt = () => {
    const existing =
        JSON.parse(localStorage.getItem("testHistory")) || [];

    const newAttempt = {
        id: Date.now(),
        title: "TCS Mock Test 1",
        totalScore,
        totalQuestions,
        accuracy,
        sectionScores,
        date: new Date().toLocaleString(),
    };

    localStorage.setItem(
        "testHistory",
        JSON.stringify([newAttempt, ...existing])
    );
    };

    saveAttempt();

  return (
    <div className="result-container">
      <h2>Test Result Summary</h2>

      <div className="result-overview">
        <div className="result-card">
          <h3>Total Score</h3>
          <p>
            {totalScore} / {totalQuestions}
          </p>
        </div>

        <div className="result-card">
          <h3>Accuracy</h3>
          <p>{accuracy}%</p>
        </div>

        <div className="result-card">
          <h3>Readiness Score</h3>
          <p>{readinessScore} / 10</p>
        </div>

        <div className="result-card">
          <h3>Performance</h3>
          <p>{performance}</p>
        </div>
      </div>

      <h3>Section-wise Breakdown</h3>

      <div className="section-breakdown">
        {sectionScores.map((sec, index) => {
          const secAccuracy = (
            (sec.score / sec.total) *
            100
          ).toFixed(1);

          return (
            <div key={index} className="section-card">
              <h4>{sec.section}</h4>
              <p>
                Score: {sec.score} / {sec.total}
              </p>
              <p>Accuracy: {secAccuracy}%</p>
            </div>
          );
        })}
      </div>

      <div className="result-actions">
        <button
          className="secondary-btn"
          onClick={() => navigate("/dashboard/student")}
        >
          Back to Dashboard
        </button>

        <button
          className="primary-btn"
          onClick={() => navigate("/test")}
        >
          Retake Test
        </button>
      </div>
    </div>
  );
}

export default TestResult;