import { useLocation, useNavigate } from "react-router-dom";
import "../styles/testLayout.css";

export default function TestResult() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <h2 style={{ padding: "20px" }}>No result found</h2>;

  const { test, answers } = state;

  let score = 0;

  test.questions.forEach((q, i) => {
    if (answers[i] === q.answer) score++;
  });

  return (
    <div className="result-container">

      <div className="result-card-main">

        <h1>{test.name} Result</h1>

        <div className="score-box">
          <h2>Score: {score} / {test.questions.length}</h2>
          <p>
            Accuracy: {((score / test.questions.length) * 100).toFixed(1)}%
          </p>
        </div>

        {/* QUESTIONS */}
        <div className="result-list">
          {test.questions.map((q, i) => {
            const userAnswer = answers[i];
            const isCorrect = userAnswer === q.answer;

            return (
              <div
                key={i}
                className={`result-item ${isCorrect ? "correct" : "wrong"}`}
              >
                <p><b>Q{i + 1}:</b> {q.question}</p>

                <p>
                  Your Answer:{" "}
                  <span className={isCorrect ? "correct-text" : "wrong-text"}>
                    {userAnswer || "Not Attempted"}
                  </span>
                </p>

                {!isCorrect && (
                  <p>
                    Correct Answer:{" "}
                    <span className="correct-text">{q.answer}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard/student")}
        >
          Back to Dashboard
        </button>

      </div>

    </div>
  );
}