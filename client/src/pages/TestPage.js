import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProctorPanel from "../components/test/ProctorPanel";
import CodeEditor from "../components/test/CodeEditor";
import QuestionPalette from "../components/test/QuestionPalette";
import "../styles/testLayout.css";

function TestPage() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState({});
  const [testEnded, setTestEnded] = useState(false);

  /* ================= LOAD TEST ================= */
  useEffect(() => {
  const fetchTest = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tests/${testId}`, {
        headers: {
          // You MUST include the token to pass the 'protect' middleware
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await res.json();
      
      // Check if data actually contains questions
      if (data && data.questions) {
        setTest(data);
        setTimeLeft((data.duration || 30) * 60);
      } else {
        console.error("Test loaded but has no questions. Did you run 'Generate Test'?");
      }
    } catch (err) {
      console.error("Failed to load test:", err);
    }
  };
  fetchTest();
}, [testId]);

  const questions = test?.questions || [];
  const q = questions[current];

  /* ================= CORE SUBMIT LOGIC ================= */
  const processSubmission = useCallback(async () => {
    if (testEnded || !test) return;
    setTestEnded(true);

    let score = 0;
    test.questions.forEach((question, i) => {
      if (answers[i] === question.answer) score++;
    });

    const percent = Math.round((score / test.questions.length) * 100);

    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          testId,
          score: percent,
          answers: Object.keys(answers).map((i) => ({
            questionId: test.questions[i]._id,
            selectedOption: answers[i],
          })),
        }),
      });
      navigate("/test-result", { state: { test, answers } });
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Submission error. Contact support.");
    }
  }, [answers, test, testId, navigate, testEnded]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (!test || testEnded) return;
    if (timeLeft <= 0) {
      processSubmission();
      return;
    }

    const t = setInterval(() => setTimeLeft((prev) => prev - 1), 2000);
    return () => clearInterval(t);
  }, [timeLeft, test, testEnded, processSubmission]);

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleAnswer = (opt) => {
    setAnswers((prev) => ({ ...prev, [current]: opt }));
  };

  const handleManualSubmit = () => {
    if (window.confirm("Are you sure you want to submit the test?")) {
      processSubmission();
    }
  };

  if (!test) return <div className="loading-screen"><h2>Loading assessment...</h2></div>;

  return (
    <div className="test-page-wrapper">
      <nav className="test-navbar">
        <div className="nav-left">
          <span className="test-badge">Live Exam</span>
          <h2>{test.name || "Assessment"}</h2>
        </div>
        <div className={`timer-display ${timeLeft < 300 ? "timer-low" : ""}`}>
          ⏱ {formatTime(timeLeft)}
        </div>
      </nav>

      <div className="test-layout">
        <main className="test-main">
          <div className="question-card">
            <div className="question-header">
              <span>Question {current + 1} of {questions.length}</span>
            </div>

            <div className="question-content">
              <h3 className="question-text">{q?.question}</h3>

              {q?.options && (
                <div className="options-grid">
                  {q.options.map((opt, i) => (
                    <button
                      key={i}
                      className={`option-btn ${answers[current] === opt ? "selected" : ""}`}
                      onClick={() => handleAnswer(opt)}
                    >
                      <span className="option-alpha">{String.fromCharCode(65 + i)}</span>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {q?.type === "coding" && <CodeEditor />}
            </div>

            <div className="test-footer-actions">
              <div className="nav-btns">
                <button
                  className="btn-secondary"
                  disabled={current === 0}
                  onClick={() => setCurrent((c) => c - 1)}
                >
                  ← Previous
                </button>
                <button
                  className="btn-secondary"
                  disabled={current === questions.length - 1}
                  onClick={() => setCurrent((c) => c + 1)}
                >
                  Next →
                </button>
              </div>

              <button className="btn-submit" onClick={handleManualSubmit}>
                Final Submit
              </button>
            </div>
          </div>
        </main>

        <aside className="test-sidebar">
          {!testEnded && (
            <div className="sidebar-section">
              <ProctorPanel onAutoSubmit={processSubmission} />
            </div>
          )}
          <div className="sidebar-section">
            <QuestionPalette
              questions={questions}
              answers={answers}
              current={current}
              setCurrent={setCurrent}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}

export default TestPage;