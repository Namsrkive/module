import { useEffect, useState, useRef, useCallback } from "react";
import FaceMonitor from "./FaceMonitor";

function ProctorPanel({ onAutoSubmit }) {
  const [tabSwitch, setTabSwitch] = useState(0);
  const [copyAttempts, setCopyAttempts] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [violations, setViolations] = useState(0);
  const [warnings, setWarnings] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const faceRef = useRef(null);

  // Memoize violation logic to prevent unnecessary re-renders
  const addViolation = useCallback((message) => {
    setViolations((v) => v + 1);
    setWarnings((prev) => [
      { id: Date.now(), text: message },
      ...prev.slice(0, 2), // Keep only last 3 warnings to save space
    ]);
  }, []);

  /* ================= TAB SWITCH ================= */
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setTabSwitch((v) => v + 1);
        addViolation("Tab switching detected");
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [addViolation]);

  /* ================= COPY / PASTE ================= */
  useEffect(() => {
    const block = (e) => {
      e.preventDefault();
      setCopyAttempts((v) => v + 1);
      addViolation("Restricted action: Copy/Paste");
    };
    document.addEventListener("copy", block);
    document.addEventListener("paste", block);

    return () => {
      document.removeEventListener("copy", block);
      document.removeEventListener("paste", block);
    };
  }, [addViolation]);

  /* ================= FULLSCREEN ================= */
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullscreen(false);
        addViolation("Window minimized or exited fullscreen");
      } else {
        setFullscreen(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [addViolation]);

  /* ================= AUTO SUBMIT LOGIC ================= */
  useEffect(() => {
    if (submitted) return;

    if (violations === 4) {
      alert("⚠️ CRITICAL WARNING: One more violation will result in automatic submission!");
    }

    if (violations >= 5) {
      setSubmitted(true);
      alert("Test auto-submitted due to security violations.");
      
      // Stop camera via ref before navigating
      faceRef.current?.stopCamera?.();
      onAutoSubmit();
    }
  }, [violations, submitted, onAutoSubmit]);

  /* ================= WINDOW UNLOAD ================= */
  useEffect(() => {
  const handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = "Warning: Leaving this page will submit your test.";
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  const currentRef = faceRef.current; // ✅ capture once

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
    currentRef?.stopCamera?.(); // ✅ use stable ref
  };
}, []);

  return (
    <div className="proctor-panel-container">
      <div className="proctor-monitor-card">
        <div className="proctor-header">
          <div className="pulse-dot"></div>
          <h3>Proctor Monitor</h3>
        </div>

        <div className="proctor-stats">
          <div className="stat-line">
            <span>Camera Status</span>
            <span className="status-online">Active</span>
          </div>
          <div className="stat-line">
            <span>Fullscreen</span>
            <span className={fullscreen ? "text-success" : "text-danger"}>
              {fullscreen ? "Enabled" : "Disabled"}
            </span>
          </div>
          <div className="stat-line">
            <span>Tab Switches</span>
            <span>{tabSwitch}</span>
          </div>
          <div className="stat-line">
            <span>Copy Attempts</span>
            <span>{copyAttempts}</span>
          </div>
          <div className="violation-count">
             <label>Total Violations</label>
             <div className="violation-bar">
                <div 
                  className="violation-fill" 
                  style={{ width: `${(violations / 5) * 100}%`, backgroundColor: violations >= 4 ? '#ef4444' : '#f59e0b' }}
                ></div>
             </div>
             <span className="violation-text">{violations} / 5</span>
          </div>
        </div>

        {warnings.length > 0 && (
          <div className="warning-log">
            {warnings.map((w) => (
              <div key={w.id} className="warning-item">
                {w.text}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="camera-preview-box">
        <FaceMonitor ref={faceRef} addViolation={addViolation} />
      </div>
    </div>
  );
}

export default ProctorPanel;