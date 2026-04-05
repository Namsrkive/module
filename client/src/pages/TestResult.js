import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/test.css";

function TestResult() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/results/latest", {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        });

        const data = await res.json();
        setResult(data);
      } catch (err) {
        console.error("Error fetching result:", err);
      }
    };

    fetchResult();
  }, []);

  if (!result) {
    return <div style={{ padding: "20px" }}>Loading result...</div>;
  }

  const accuracy = Math.round(
    (result.correct / (result.attempted || 1)) * 100
  );

  return (
    <div className="result-container">
      <h1>Test Result</h1>

      <div className="result-card">
        <h2>
          {result.score} / {result.total}
        </h2>

        <div className="result-stats">
          <p>✅ Correct: {result.correct}</p>
          <p>❌ Wrong: {result.wrong}</p>
          <p>📝 Attempted: {result.attempted}</p>
          <p>🎯 Accuracy: {accuracy}%</p>
        </div>

        <div className="result-actions">
          <button onClick={() => navigate("/dashboard/student")}>
            Go to Dashboard
          </button>

          <button onClick={() => navigate("/tests")}>
            Take Another Test
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestResult;