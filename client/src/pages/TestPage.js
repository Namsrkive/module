import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGeneratedTest } from "../data/testStore";
import "../styles/testLayout.css";

function TestPage() {
  const navigate = useNavigate();
  const test = getGeneratedTest();

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600);
  const [submitting, setSubmitting] = useState(false);

  const questions = test?.questions || [];
  const q = questions[current];

  /* ⏱ TIMER */
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit(true); // auto submit
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  /* ANSWER */
  const handleAnswer = (val) => {
    setAnswers(prev => ({ ...prev, [q.id]: val }));
    setStatus(prev => ({ ...prev, [q.id]: "answered" }));
  };

  /* NAVIGATION */
  const goNext = () => {
    if (!answers[q.id]) {
      setStatus(prev => ({ ...prev, [q.id]: "visited" }));
    }
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const goPrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const markReview = () => {
    setStatus(prev => ({ ...prev, [q.id]: "review" }));
    goNext();
  };

  const clearAnswer = () => {
    const updated = { ...answers };
    delete updated[q.id];
    setAnswers(updated);
    setStatus(prev => ({ ...prev, [q.id]: "visited" }));
  };

  /* SUBMIT */
  const handleSubmit = async (auto = false) => {
    if (submitting) return;

    if (!auto && !window.confirm("Are you sure you want to submit?")) return;

    setSubmitting(true);

    let score = 0;
    let correct = 0;
    let wrong = 0;

    questions.forEach(q => {
      const userAns = answers[q.id];

      if (!userAns) return;

      if (userAns === q.correctAnswer) {
        score += q.marks;
        correct++;
      } else {
        score -= q.negativeMarks || 0;
        wrong++;
      }
    });

    try {
      await fetch("http://localhost:5000/api/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          testId: test.id,
          answers,
          questions,
          score,
          total: questions.reduce((sum, q) => sum + q.marks, 0),
          correct,
          wrong,
          attempted: Object.keys(answers).length,
          timeTaken: 3600 - timeLeft
        })
      });

      navigate("/test-result");

    } catch (err) {
      console.error("Error submitting test:", err);
      alert("Submission failed");
      setSubmitting(false);
    }
  };

  if (!test || questions.length === 0) {
    return <h2 style={{ padding: "20px" }}>No test available</h2>;
  }

  return (
    <div className="test-container">

      {/* HEADER */}
      <div className="test-header">
        <h2>{test.name}</h2>
        <div className="timer">⏱ {formatTime(timeLeft)}</div>
      </div>

      <div className="test-body">

        {/* QUESTION AREA */}
        <div className="question-area">
          <h3>Q{current + 1}. {q.question}</h3>

          {q.type === "mcq" && (
            <div className="options">
              {q.options.map((opt, i) => (
                <label key={i} className={answers[q.id] === opt ? "selected" : ""}>
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    checked={answers[q.id] === opt}
                    onChange={() => handleAnswer(opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          )}

          {q.type === "short" && (
            <input
              type="text"
              placeholder="Type your answer..."
              value={answers[q.id] || ""}
              onChange={(e) => handleAnswer(e.target.value)}
            />
          )}

          {/* ACTIONS */}
          <div className="actions">
            <button onClick={markReview}>Mark for Review</button>
            <button onClick={clearAnswer}>Clear</button>
            <button onClick={goPrev}>Prev</button>
            <button onClick={goNext}>Save & Next</button>
          </div>
        </div>

        {/* PALETTE */}
        <div className="palette">
          <h4>Questions</h4>

          <div className="palette-grid">
            {questions.map((qq, i) => {
              let cls = "";

              if (status[qq.id] === "review") cls = "review";
              else if (answers[qq.id]) cls = "answered";
              else if (status[qq.id] === "visited") cls = "visited";

              if (i === current) cls += " current";

              return (
                <div
                  key={i}
                  className={`box ${cls}`}
                  onClick={() => setCurrent(i)}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>

          <button
            className="submit-btn"
            onClick={() => handleSubmit(false)}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Test"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestPage;