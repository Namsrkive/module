import { useEffect, useState } from "react";
import FaceMonitor from "./FaceMonitor";

function ProctorPanel() {

const [tabSwitch,setTabSwitch] = useState(0);
const [copyAttempts,setCopyAttempts] = useState(0);
const [fullscreen,setFullscreen] = useState(false);

/* ================= TAB SWITCH DETECTION ================= */

useEffect(()=>{

const handleVisibility = ()=>{

if(document.hidden){
setTabSwitch(prev=>prev+1);
alert("Tab switching detected!");
}

};

document.addEventListener("visibilitychange",handleVisibility);

return ()=>{
document.removeEventListener("visibilitychange",handleVisibility);
};

},[]);

/* ================= COPY PASTE BLOCK ================= */

useEffect(()=>{

const blockCopy = (e)=>{
e.preventDefault();
setCopyAttempts(prev=>prev+1);
alert("Copy paste is disabled during exam");
};

document.addEventListener("copy",blockCopy);
document.addEventListener("paste",blockCopy);

return ()=>{
document.removeEventListener("copy",blockCopy);
document.removeEventListener("paste",blockCopy);
};

},[]);

/* ================= FULLSCREEN ENFORCEMENT ================= */

useEffect(()=>{

const enableFullscreen = ()=>{
if(!document.fullscreenElement){
document.documentElement.requestFullscreen();
setFullscreen(true);
}
};

enableFullscreen();

},[]);

return(

<div className="proctor-panel">

<h4>Proctor Monitor</h4>

<FaceMonitor/>

<div className="proctor-status">

<p>Camera: Active</p>

<p>Fullscreen: {fullscreen ? "Enabled" : "Disabled"}</p>

<p>Tab Switch Warnings: {tabSwitch}</p>

<p>Copy Attempts: {copyAttempts}</p>

</div>

</div>

);

}

export default ProctorPanel;