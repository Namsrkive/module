import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as faceapi from "face-api.js";

const FaceMonitor = forwardRef(({ addViolation }, ref) => {

  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const streamRef = useRef(null);

  const noFaceCountRef = useRef(0);
  const startTimeRef = useRef(Date.now());

  /* ================= STOP CAMERA ================= */
  const stopCamera = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  useImperativeHandle(ref, () => ({
    stopCamera
  }));

  /* ================= MAIN ================= */
  useEffect(() => {

    const startDetection = () => {
      intervalRef.current = setInterval(async () => {

        if (!videoRef.current) return;

        if (Date.now() - startTimeRef.current < 5000) return;

        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 320,
            scoreThreshold: 0.5
          })
        );

        if (detections.length === 0) {
          noFaceCountRef.current++;

          if (noFaceCountRef.current >= 3) {
            addViolation("No face detected");
            noFaceCountRef.current = 0;
          }
        } else {
          noFaceCountRef.current = 0;
        }

        if (detections.length > 1) {
          addViolation("Multiple faces detected");
        }

      }, 2000);
      
    };

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true  
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();

            setTimeout(() => {
              startDetection();
            }, 2000);
          };
        }

      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        startVideo();
      } catch (err) {
        console.error("Model loading error:", err);
      }
    };

    loadModels();

    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      className="face-video"
    />
  );
});

export default FaceMonitor;