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
      const res = await fetch(`/api/tests/${testId}`);
      const data = await res.json();
      setTest(data);
      setTimeLeft((data.duration || 30) * 60);
    };
    fetchTest();
  }, [testId]);

  const questions = test?.questions || [];
  const q = questions[current];

  /* ================= TIMER ================= */
  useEffect(() => {
    if (!test) return;

    if (timeLeft <= 0) {
      autoSubmit(); // ✅ FIXED (was handleSubmit)
      return;
    }

    const t = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, test]);

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  /* ================= ANSWERS ================= */
  const handleAnswer = (opt) => {
    setAnswers((prev) => ({ ...prev, [current]: opt }));
  };

  /* ================= AUTO SUBMIT ================= */
  const autoSubmit = async () => {
    if (testEnded) return;

    setTestEnded(true);

    let score = 0;
    test.questions.forEach((q, i) => {
      if (answers[i] === q.answer) score++;
    });

    const percent = Math.round((score / test.questions.length) * 100);

    await fetch("/api/results", {
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
  };

  /* ================= MANUAL SUBMIT ================= */
  const handleSubmit = useCallback(async () => {
    if (testEnded) return;

    if (!window.confirm("Are you sure you want to submit the test?")) return;

    setTestEnded(true);

    let score = 0;
    test.questions.forEach((q, i) => {
      if (answers[i] === q.answer) score++;
    });

    const percent = Math.round((score / test.questions.length) * 100);

    await fetch("/api/results", {
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
  }, [answers, testId, navigate, test, testEnded]);

  if (!test)
    return (
      <div className="loading-screen">
        <h2>Loading assessment...</h2>
      </div>
    );

  return (
    <div className="test-page-wrapper">
      {/* NAVBAR */}
      <nav className="test-navbar">
        <div className="nav-left">
          <span className="test-badge">Live Exam</span>
          <h2>{test.title}</h2>
        </div>
        <div className={`timer-display ${timeLeft < 300 ? "timer-low" : ""}`}>
          ⏱ {formatTime(timeLeft)}
        </div>
      </nav>

      <div className="test-layout">
        {/* MAIN */}
        <main className="test-main">
          <div className="question-card">
            <div className="question-header">
              <span>
                Question {current + 1} of {questions.length}
              </span>
            </div>

            <h3>{q?.question}</h3>

            {/* OPTIONS */}
            {q?.options && (
              <div className="options-grid">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    className={`option-btn ${
                      answers[current] === opt ? "selected" : ""
                    }`}
                    onClick={() => handleAnswer(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* CODING */}
            {q?.type === "coding" && <CodeEditor />}

            {/* ACTIONS */}
            <div className="test-footer-actions">
              <button
                disabled={current === 0}
                onClick={() => setCurrent((c) => c - 1)}
              >
                ← Previous
              </button>

              <button
                disabled={current === questions.length - 1}
                onClick={() => setCurrent((c) => c + 1)}
              >
                Next →
              </button>

              <button className="btn-submit" onClick={handleSubmit}>
                Final Submit
              </button>
            </div>
          </div>
        </main>

        {/* SIDEBAR */}
        <aside className="test-sidebar">
          {!testEnded && (
            <div className="sidebar-section">
              <ProctorPanel onAutoSubmit={autoSubmit} />
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