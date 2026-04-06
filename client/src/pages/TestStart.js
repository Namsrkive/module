import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TestStart() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);

  useEffect(() => {
    const fetchTest = async () => {
      const res = await fetch(`/api/tests/${testId}`);
      const data = await res.json();
      setTest(data);
    };
    fetchTest();
  }, [testId]);

  if (!test) return <h2>Loading...</h2>;

  return (
    <div className="start-container">
      <div className="start-card">

        <header className="start-header">
          {/* ✅ FIXED */}
          <h1>{test.title}</h1>

          <div className="proctor-badge">
            <span className="pulse-icon"></span> Proctoring Active
          </div>
        </header>

        <div className="info-grid">
          <div className="info-item">
            <span className="label">Duration</span>
            <span className="value">{test.duration} mins</span>
          </div>

          <div className="info-item">
            <span className="label">Questions</span>
            <span className="value">{test.questions.length}</span>
          </div>
        </div>

        <div className="rules-section">
          <h3>Exam Instructions</h3>
          <ul className="rules-list">
            <li>Do not switch tabs or minimize the window</li>
            <li>Ensure your face is clearly visible in the camera</li>
            <li>System copy/paste functions are disabled</li>
            <li>The test will launch in Fullscreen mode</li>
          </ul>
        </div>

        <div className="action-area">
          <button
            className="start-btn"
            onClick={() => navigate(`/test/${test._id}`)}
          >
            Begin Examination
          </button>

          <p className="footer-note">
            By clicking start, you agree to the proctoring terms.
          </p>
        </div>

      </div>
    </div>
  );
}