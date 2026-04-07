import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react";
import * as faceapi from "face-api.js";

const FaceMonitor = forwardRef(({ addViolation }, ref) => {
  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const streamRef = useRef(null);
  
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const noFaceCountRef = useRef(0);
  const multiFaceCountRef = useRef(0);
  const startTimeRef = useRef(Date.now());

  /* ================= EXTERNAL CONTROL ================= */
  const stopCamera = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  useImperativeHandle(ref, () => ({
    stopCamera
  }));

  /* ================= DETECTION LOGIC ================= */
  const startDetection = () => {
    // Clear any existing intervals before starting a new one
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(async () => {
      if (!videoRef.current || videoRef.current.paused || videoRef.current.ended) return;

      // Skip detection for the first 5 seconds to let user settle
      if (Date.now() - startTimeRef.current < 5000) return;

      try {
        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 320,
            scoreThreshold: 0.5
          })
        );

        // 1. NO FACE DETECTION (Wait for 3 consecutive failures)
        if (detections.length === 0) {
          noFaceCountRef.current++;
          if (noFaceCountRef.current >= 3) {
            addViolation("No face detected! Please stay in camera view.");
            noFaceCountRef.current = 0;
          }
        } else {
          noFaceCountRef.current = 0;
        }

        // 2. MULTIPLE FACE DETECTION (Wait for 2 consecutive detections to be sure)
        if (detections.length > 1) {
          multiFaceCountRef.current++;
          if (multiFaceCountRef.current >= 2) {
            addViolation("Multiple faces detected! No other person allowed.");
            multiFaceCountRef.current = 0;
          }
        } else {
          multiFaceCountRef.current = 0;
        }

      } catch (err) {
        console.error("Detection Loop Error:", err);
      }
    }, 2000); // Check every 2 seconds
  };

  /* ================= SETUP ================= */
  useEffect(() => {
    const loadModelsAndStart = async () => {
      try {
        // Only load models if they aren't already loaded
        if (!faceapi.nets.tinyFaceDetector.params) {
          await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        }
        setModelsLoaded(true);

        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 640, height: 480 } 
        });
        
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            // Delay detection start to ensure video is rendering
            setTimeout(startDetection, 2000);
          };
        }
      } catch (err) {
        console.error("Proctoring Camera/Model Error:", err);
        addViolation("Camera access denied or failed to load.");
      }
    };

    loadModelsAndStart();

    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="video-wrapper">
      {!modelsLoaded && <div className="cam-loading">Initializing AI...</div>}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="face-video"
        style={{ transform: 'scaleX(-1)' }} // Mirror view for the user
      />
    </div>
  );
});

export default FaceMonitor;