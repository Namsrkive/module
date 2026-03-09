import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

function FaceMonitor({ addViolation }) {

  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {

    const startDetection = () => {

      intervalRef.current = setInterval(async () => {

        if (!videoRef.current) return;

        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        );

        if (detections.length === 0) {
          console.log("No face detected");
          addViolation("No face detected");
        }

        if (detections.length > 1) {
          console.log("Multiple faces detected");
          addViolation("Multiple faces detected");
        }

      }, 2000);

    };

    const startVideo = async () => {

      try {

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (videoRef.current) {

          videoRef.current.srcObject = stream;

          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            startDetection();
          };

        }

      } catch (err) {
        console.error("Camera access denied:", err);
      }

    };

    const stopVideo = () => {

      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
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

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      stopVideo();
    };

  }, [addViolation]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      className="proctor-video"
    />
  );

}

export default FaceMonitor;