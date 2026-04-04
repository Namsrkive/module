import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  getQuestionsByModuleTopic,
  getTests
} from "../data/testStore";

import { submitTest as submitTestEngine } from "../services/testEngine";

import TestLayout from "../components/test/TestLayout";
import CodeEditor from "../components/test/CodeEditor";
import ProctorPanel from "../components/test/ProctorPanel";
import Timer from "../components/test/Timer";

import "../styles/test.css";

function TestPage() {

  const navigate = useNavigate();
  const { module, topic } = useParams();

  const questions = getQuestionsByModuleTopic(module, topic);
  const tests = getTests();

  const currentTest = tests.find(
    t =>
      t.module?.toLowerCase() === module &&
      t.topic?.toLowerCase() === topic
  );

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  /* ================= SAFETY ================= */

  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  /* ================= STOP CAMERA ================= */

  const stopCamera = () => {
    const videos = document.querySelectorAll("video");
    videos.forEach(video => {
      if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
      }
    });
  };

  /* ================= EXIT FULLSCREEN ================= */

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  /* ================= SELECT OPTION ================= */

  const selectOption = (option) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: option
    }));
  };

  /* ================= SUBMIT ================= */

  const submitTest = () => {

    if (submitted) return;
    setSubmitted(true);

    const answerArray = questions.map((q, i) => answers[i] || null);

    const test = {
      id: currentTest?.id || `${module}-${topic}`,
      title: currentTest?.name || `${module} ${topic}`,
      questions
    };

    const resultEngine = submitTestEngine({
      studentId: "student1",
      test,
      answers: answerArray,
      violations: 0,
      timeTaken: 1200
    });

    const result = {
      studentId: "student1",
      testId: test.id,
      testTitle: test.title,
      module,
      topic,
      score: resultEngine.score,
      total: resultEngine.total,
      percentage:
        resultEngine.total > 0
          ? Math.round((resultEngine.score / resultEngine.total) * 100)
          : 0,
      date: new Date().toLocaleString()
    };

    /* ✅ STORE RESULTS (IMPORTANT FOR ANALYTICS) */
    const existingResults =
      JSON.parse(localStorage.getItem("results")) || [];

    existingResults.push(result);

    localStorage.setItem("results", JSON.stringify(existingResults));
    localStorage.setItem("latestResult", JSON.stringify(result));

    /* ✅ STOP PROCTORING */
    stopCamera();
    exitFullscreen();

    navigate("/test-result", { state: result });
  };

  /* ================= AUTO SUBMIT ================= */

  const handleAutoSubmit = () => {
    submitTest();
  };

  /* ================= TIMER ================= */

  const handleTimeUp = () => {
    alert("Time is up! Submitting test...");
    submitTest();
  };

  /* ================= EMPTY ================= */

  if (!questions || questions.length === 0) {
    return (
      <TestLayout>
        <h2>No Questions Found</h2>
      </TestLayout>
    );
  }

  const question = questions[questionIndex];

  return (
    <TestLayout>

      {/* HEADER */}
      <div className="tcs-header">
        <h3>{module} - {topic}</h3>
        <Timer duration={20} onTimeUp={handleTimeUp} />
      </div>

      {/* BODY */}
      <div className="tcs-body">

        {/* LEFT */}
        <div className="tcs-left">

          <h4>
            Q{questionIndex + 1}. {question.question}
          </h4>

          {question.type === "mcq" && (
            <div className="options">
              {question.options.map((opt, i) => (
                <div
                  key={i}
                  className={`option ${
                    answers[questionIndex] === opt ? "selected" : ""
                  }`}
                  onClick={() => selectOption(opt)}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}

          {question.type === "coding" && <CodeEditor />}

        </div>

        {/* RIGHT */}
        <div className="tcs-right">

          {/* PALETTE */}
          <div className="palette-grid">
            {questions.map((q, i) => {
              let className = "palette-btn";

              if (answers[i]) className += " answered";
              if (questionIndex === i) className += " palette-current";

              return (
                <button
                  key={i}
                  className={className}
                  onClick={() => setQuestionIndex(i)}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          {/* PROCTOR */}
          <ProctorPanel onAutoSubmit={handleAutoSubmit} />

        </div>

      </div>

      {/* NAV */}
      <div className="test-nav">

        <button onClick={() => setQuestionIndex(p => Math.max(p - 1, 0))}>
          Previous
        </button>

        <button onClick={() =>
          setQuestionIndex(p => Math.min(p + 1, questions.length - 1))
        }>
          Next
        </button>

        <button className="submit-btn" onClick={submitTest}>
          Submit Test
        </button>

      </div>

    </TestLayout>
  );
}

export default TestPage;