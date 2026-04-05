import { useState, useEffect, useMemo } from "react";
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

  const questions = useMemo(() => getQuestionsByModuleTopic(module, topic), [module, topic]);
  const tests = useMemo(() => getTests(), []);

  const currentTest = tests.find(
    t =>
      t.module?.toLowerCase() === module?.toLowerCase() &&
      t.topic?.toLowerCase() === topic?.toLowerCase()
  );

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  const stopCamera = () => {
    const videos = document.querySelectorAll("video");
    videos.forEach(video => {
      if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
      }
    });
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  const selectOption = (option) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: option
    }));
  };

  /* ================= SUBMIT ================= */

  const submitTest = async () => {
    if (submitted) return;
    setSubmitted(true);

    const answerArray = questions.map((q, i) => answers[i] || null);

    const testData = {
      id: currentTest?.id || `${module}-${topic}`,
      title: currentTest?.name || `${module} ${topic}`,
      questions
    };

    const resultEngine = submitTestEngine({
      studentId: "student1",
      test: testData,
      answers: answerArray,
      violations: 0,
      timeTaken: 1200
    });

    const result = {
      studentId: "student1",
      testId: testData.id,
      testTitle: testData.title,
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

    /* ===== LOCAL STORAGE ===== */
    const existingResults = JSON.parse(localStorage.getItem("results")) || [];
    existingResults.push(result);
    localStorage.setItem("results", JSON.stringify(existingResults));
    localStorage.setItem("latestResult", JSON.stringify(result));

    /* ===== SAVE TO DATABASE ===== */
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user._id) {
        console.error("User not found in localStorage");
        return;
      }

      const res = await fetch("http://localhost:5000/api/results/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user._id,
          score: resultEngine.score,
          totalQuestions: resultEngine.total,
          correctAnswers: resultEngine.score,
          module: module
        })
      });

      const data = await res.json();
      console.log("Saved result:", data);

    } catch (err) {
      console.error("DB save failed", err);
    }

    stopCamera();
    exitFullscreen();
    navigate("/test-result", { state: result });
  };

  const handleTimeUp = () => {
    alert("Time is up! Submitting test...");
    submitTest();
  };

  if (!questions || questions.length === 0) {
    return (
      <TestLayout>
        <div className="error-state">No Questions Found</div>
      </TestLayout>
    );
  }

  const question = questions[questionIndex];

  return (
    <TestLayout>
      <>
        <div className="tcs-header">
          <h3>{module.toUpperCase()} - {topic.replace("-", " ")}</h3>
          <Timer duration={20} onTimeUp={handleTimeUp} />
        </div>

        <div className="tcs-body">
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

          <div className="tcs-right">
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
            <ProctorPanel onAutoSubmit={submitTest} />
          </div>
        </div>

        <div className="test-nav">
          <button
            disabled={questionIndex === 0}
            onClick={() => setQuestionIndex(p => Math.max(p - 1, 0))}
          >
            Previous
          </button>

          <button
            disabled={questionIndex === questions.length - 1}
            onClick={() =>
              setQuestionIndex(p => Math.min(p + 1, questions.length - 1))
            }
          >
            Next
          </button>

          <button className="submit-btn" onClick={submitTest}>
            Submit Test
          </button>
        </div>
      </>
    </TestLayout>
  );
}

export default TestPage;