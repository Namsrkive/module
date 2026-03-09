import { useNavigate, useParams } from "react-router-dom";
import "../styles/testStart.css";

function TestStart() {

  const navigate = useNavigate();
  const { module, topic } = useParams();

  const startTest = async () => {

    if (document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen();
    }

    navigate(`/test/${module}/${topic}/attempt`);
  };

  return (

    <div className="test-start-wrapper">

      <div className="test-start-card">

        <h1 className="test-title">
          {module} - {topic}
        </h1>

        <div className="test-info-grid">

          <div className="test-info">
            ⏱ Duration
            <span>20 Minutes</span>
          </div>

          <div className="test-info">
            📄 Questions
            <span>3 Questions</span>
          </div>

          <div className="test-info">
            🚫 Tab Switch
            <span>Not Allowed</span>
          </div>

          <div className="test-info">
            📷 Proctoring
            <span>Camera Enabled</span>
          </div>

        </div>

        <div className="instructions">

          <h3>Instructions</h3>

          <ul>
            <li>Do not switch tabs during the test.</li>
            <li>Your camera will remain active.</li>
            <li>The test auto submits after 5 violations.</li>
            <li>Fullscreen mode is required.</li>
            <li>Use the question palette to navigate.</li>
          </ul>

        </div>

        <button
          className="start-test-btn"
          onClick={startTest}
        >
          Start Test
        </button>

      </div>

    </div>

  );
}

export default TestStart;