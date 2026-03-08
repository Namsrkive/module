import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";

function FaceMonitor(){

const webcamRef = useRef(null);

const [faceStatus,setFaceStatus] = useState("Detecting...");
const [warnings,setWarnings] = useState(0);

useEffect(()=>{

const loadModels = async ()=>{

await faceapi.nets.tinyFaceDetector.loadFromUri("/models");

};

loadModels();

},[]);

useEffect(()=>{

const interval = setInterval(async ()=>{

if(!webcamRef.current) return;

const video = webcamRef.current.video;

if(!video) return;

const detections = await faceapi.detectAllFaces(
video,
new faceapi.TinyFaceDetectorOptions()
);

if(detections.length === 0){

setFaceStatus("No Face Detected");
setWarnings(prev=>prev+1);

}

else if(detections.length > 1){

setFaceStatus("Multiple Faces Detected");
setWarnings(prev=>prev+1);

}

else{

setFaceStatus("Face Detected");

}

},3000);

return ()=>clearInterval(interval);

},[]);

return(

<div className="face-monitor">

<Webcam
ref={webcamRef}
audio={false}
width="100%"
/>

<div className="face-status">

<p>Status: {faceStatus}</p>

<p>Warnings: {warnings}</p>

</div>

</div>

);

}

export default FaceMonitor;