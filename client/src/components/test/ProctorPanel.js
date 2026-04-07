import { useEffect, useState, useRef, useCallback } from "react";
import FaceMonitor from "./FaceMonitor";
import { ShieldAlert, Video, Maximize, Copy, Layers } from "lucide-react";

function ProctorPanel({ onAutoSubmit }) {
  const [tabSwitch, setTabSwitch] = useState(0);
  const [copyAttempts, setCopyAttempts] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [violations, setViolations] = useState(0);
  const [warnings, setWarnings] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const faceRef = useRef(null);

  // Trigger Fullscreen on Mount
  useEffect(() => {
    const enterFS = async () => {
      try {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
          setFullscreen(true);
        }
      } catch (err) {
        console.warn("Fullscreen auto-request blocked by browser.");
      }
    };
    enterFS();
  }, []);

  const addViolation = useCallback((message) => {
    setViolations((v) => {
      const newCount = v + 1;
      // Auto-submit at 5 violations
      if (newCount >= 5 && !submitted) {
        setSubmitted(true);
        onAutoSubmit();
      }
      return newCount;
    });

    setWarnings((prev) => [
      { id: Date.now(), text: message },
      ...prev.slice(0, 2),
    ]);
  }, [onAutoSubmit, submitted]);

  /* ================= VIOLATION TRIGGERS ================= */
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setTabSwitch((v) => v + 1);
        addViolation("Tab switching detected! (Violation)");
      }
    };
    const block = (e) => {
      e.preventDefault();
      setCopyAttempts((v) => v + 1);
      addViolation("Restricted action: Copy/Paste");
    };
    const handleFSChange = () => {
      if (!document.fullscreenElement) {
        setFullscreen(false);
        addViolation("Fullscreen exited! Stay in fullscreen mode.");
      } else {
        setFullscreen(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    document.addEventListener("copy", block);
    document.addEventListener("paste", block);
    document.addEventListener("fullscreenchange", handleFSChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("copy", block);
      document.removeEventListener("paste", block);
      document.removeEventListener("fullscreenchange", handleFSChange);
    };
  }, [addViolation]);

  return (
    <div className="proctor-panel-container">
      <div className="proctor-monitor-card">
        <div className="proctor-header">
          <ShieldAlert className="pulse-icon" size={20} color="#ef4444" />
          <h3>Security Monitor</h3>
        </div>

        <div className="proctor-stats">
          <div className={`stat-pill ${fullscreen ? "success" : "danger"}`}>
            <Maximize size={14} /> Fullscreen: {fullscreen ? "ON" : "OFF"}
          </div>
          
          <div className="stat-grid">
            <div className="stat-item">
              <Layers size={14} /> <span>Tabs: {tabSwitch}</span>
            </div>
            <div className="stat-item">
              <Copy size={14} /> <span>Copy: {copyAttempts}</span>
            </div>
          </div>

          <div className="violation-section">
            <div className="violation-header">
               <label>Violation Progress</label>
               <span className={violations >= 4 ? "urgent" : ""}>{violations} / 5</span>
            </div>
            <div className="progress-bar-bg">
              <div 
                className="progress-fill" 
                style={{ 
                  width: `${(violations / 5) * 100}%`, 
                  backgroundColor: violations >= 4 ? '#ef4444' : '#f59e0b' 
                }}
              ></div>
            </div>
            {violations === 4 && <p className="critical-warning">⚠️ FINAL WARNING: Next violation submits test!</p>}
          </div>
        </div>

        {warnings.length > 0 && (
          <div className="warning-log">
            {warnings.map((w) => (
              <div key={w.id} className="warning-item">! {w.text}</div>
            ))}
          </div>
        )}
      </div>

      <div className="camera-preview-box">
        <div className="cam-label"><Video size={12} /> Live AI Proctoring</div>
        <FaceMonitor ref={faceRef} addViolation={addViolation} />
      </div>
    </div>
  );
}

export default ProctorPanel;