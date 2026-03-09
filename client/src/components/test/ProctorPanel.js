import { useEffect, useState } from "react";
import FaceMonitor from "./FaceMonitor";

function ProctorPanel(){

const [tabSwitch,setTabSwitch] = useState(0);
const [copyAttempts,setCopyAttempts] = useState(0);
const [fullscreen,setFullscreen] = useState(false);
const [violations,setViolations] = useState(0);

/* TAB SWITCH */

useEffect(()=>{

const handleVisibility = ()=>{

if(document.hidden){

setTabSwitch(v=>v+1);
setViolations(v=>v+1);

alert("Tab switching detected!");

}

};

document.addEventListener("visibilitychange",handleVisibility);

return ()=>{
document.removeEventListener("visibilitychange",handleVisibility);
};

},[]);

/* COPY PASTE */

useEffect(()=>{

const blockCopy = (e)=>{

e.preventDefault();
setCopyAttempts(v=>v+1);
setViolations(v=>v+1);

alert("Copy paste disabled during exam");

};

document.addEventListener("copy",blockCopy);
document.addEventListener("paste",blockCopy);

return ()=>{
document.removeEventListener("copy",blockCopy);
document.removeEventListener("paste",blockCopy);
};

},[]);

/* FULLSCREEN */

useEffect(()=>{

const enableFullscreen = ()=>{

if(!document.fullscreenElement){

document.documentElement.requestFullscreen();
setFullscreen(true);

}

};

enableFullscreen();

},[]);

/* AUTO SUBMIT IF TOO MANY VIOLATIONS */

useEffect(()=>{

if(violations >= 5){

alert("Too many violations. Test auto submitted.");

window.location.href = "/dashboard";

}

},[violations]);

return(

<div className="proctor-panel">

<h4>Proctor Monitor</h4>

<FaceMonitor addViolation={()=>setViolations(v=>v+1)}/>

<div className="proctor-status">

<p>Camera: Active</p>
<p>Fullscreen: {fullscreen ? "Enabled":"Disabled"}</p>
<p>Tab Switch: {tabSwitch}</p>
<p>Copy Attempts: {copyAttempts}</p>
<p className="violation">Violations: {violations}/5</p>

</div>

</div>

);

}

export default ProctorPanel;