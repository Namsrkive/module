import { useEffect, useState, useRef } from "react";
import FaceMonitor from "./FaceMonitor";

function ProctorPanel({ onAutoSubmit }) {

  const [tabSwitch, setTabSwitch] = useState(0);
  const [copyAttempts, setCopyAttempts] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [violations, setViolations] = useState(0);
  const [warnings, setWarnings] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const faceRef = useRef(null);

  const addViolation = (message) => {
    setViolations(v => v + 1);

    setWarnings(prev => [
      { id: Date.now(), text: message },
      ...prev
    ]);
  };

  /* ================= TAB SWITCH ================= */
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setTabSwitch(v => v + 1);
        addViolation("Tab switching detected");
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  /* ================= COPY / PASTE ================= */
  useEffect(() => {
    const block = (e) => {
      e.preventDefault();
      setCopyAttempts(v => v + 1);
      addViolation("Copy paste attempt detected");
    };

    document.addEventListener("copy", block);
    document.addEventListener("paste", block);

    return () => {
      document.removeEventListener("copy", block);
      document.removeEventListener("paste", block);
    };
  }, []);

  /* ================= FULLSCREEN ================= */
  useEffect(() => {

    const enterFullscreen = async () => {
      if (!document.fullscreenElement) {
        try {
          await document.documentElement.requestFullscreen();
          setFullscreen(true);
        } catch (err) {
          console.log("Fullscreen error:", err);
        }
      }
    };

    enterFullscreen();

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullscreen(false);
        addViolation("Exited fullscreen");
      } else {
        setFullscreen(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };

  }, []);

  /* ================= AUTO SUBMIT ================= */
  useEffect(() => {

    if (submitted) return;

    if (violations === 4) {
      alert("⚠️ Warning: One more violation will auto submit the test!");
    }

    if (violations >= 5) {
      setSubmitted(true);

      alert("Test auto submitted due to violations");

      faceRef.current?.stopCamera();
      onAutoSubmit();
    }

  }, [violations]);

  /* ================= CLEANUP ================= */
  useEffect(() => {
    window.onbeforeunload = () => "Test is running!";

    return () => {
      window.onbeforeunload = null;
      faceRef.current?.stopCamera();
    };
  }, []);

  return (
    <>
      {/* ===== PANEL ===== */}
      <div className="proctor-panel">
        <h4>Proctor Monitor</h4>

        <div className="warning-box">
          {warnings.map(w => (
            <p key={w.id} className="warning-text">⚠️ {w.text}</p>
          ))}
        </div>

        {violations >= 4 && (
          <div className="danger-banner">
            ⚠️ Final Warning: Next violation = Auto Submit
          </div>
        )}

        <div className="proctor-status">
          <p>Camera: Active</p>
          <p>Fullscreen: {fullscreen ? "Enabled" : "Disabled"}</p>
          <p>Tab Switch: {tabSwitch}</p>
          <p>Copy Attempts: {copyAttempts}</p>
          <p className="violation">Violations: {violations}/5</p>
        </div>
      </div>

      {/* ===== FLOATING CAMERA ===== */}
      <div className="camera-container">
        <FaceMonitor ref={faceRef} addViolation={addViolation} />
      </div>
    </>
  );
}

export default ProctorPanel;