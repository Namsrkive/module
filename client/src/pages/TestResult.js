import { useLocation, useNavigate } from "react-router-dom";
import { XCircle, Home, Award, ChevronLeft, Target, BarChart3 } from "lucide-react";
import "../styles/result.css";

export default function TestResult() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <div className="error-state"><h2>No test session found</h2></div>;

  const { test, answers } = state;
  
  let score = 0;
  test.questions.forEach((q, i) => {
    if (answers[i] === q.answer) score++;
  });

  const percentage = (score / test.questions.length) * 100;
  const isPassed = percentage >= 60;

  return (
    <div className="result-fixed-wrapper">
      <div className="result-container-split">
        
        {/* LEFT PANEL: FIXED SUMMARY */}
        <aside className="result-sidebar-summary">
          <button onClick={() => navigate("/dashboard/student")} className="back-link">
            <ChevronLeft size={18} /> Dashboard
          </button>

          <div className="summary-content">
            <div className={`status-badge-large ${isPassed ? "pass" : "fail"}`}>
              {isPassed ? <Award size={40} /> : <XCircle size={40} />}
              <h2>{isPassed ? "Passed" : "Failed"}</h2>
            </div>

            <h1 className="test-title-display">{test.name}</h1>

            <div className="stats-vertical">
              <div className="stat-card-mini">
                <BarChart3 size={20} />
                <div>
                  <label>Final Score</label>
                  <span>{score} / {test.questions.length}</span>
                </div>
              </div>
              <div className="stat-card-mini">
                <Target size={20} />
                <div>
                  <label>Accuracy</label>
                  <span>{percentage.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <button className="btn-exit-primary" onClick={() => navigate("/dashboard/student")}>
              <Home size={20} /> Exit to Dashboard
            </button>
          </div>
        </aside>

        {/* RIGHT PANEL: SCROLLABLE REVIEW */}
        <main className="result-review-main">
          <div className="review-header-sticky">
            <h3>Question Review</h3>
          </div>
          
          <div className="review-scroll-area">
            {test.questions.map((q, i) => {
              const userAnswer = answers[i];
              const isCorrect = userAnswer === q.answer;

              return (
                <div key={i} className={`review-card-item ${isCorrect ? "correct" : "wrong"}`}>
                  <div className="q-index">Question {i + 1}</div>
                  <p className="q-text-main">{q.question}</p>
                  
                  <div className="answer-box-comparison">
                    <div className="ans-tag">
                      <label>Your Answer:</label>
                      <span className={isCorrect ? "txt-success" : "txt-danger"}>
                        {userAnswer || "Not Attempted"}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div className="ans-tag">
                        <label>Correct:</label>
                        <span className="txt-success">{q.answer}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>

      </div>
    </div>
  );
}