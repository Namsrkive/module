import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { createTest } from "../../data/testStore";

function CreateTest(){

const [title,setTitle] = useState("");
const [duration,setDuration] = useState("");
const [type,setType] = useState("module");
const [difficulty,setDifficulty] = useState("medium");

const [module,setModule] = useState("");
const [topic,setTopic] = useState("");
const [company,setCompany] = useState("");

const modules = {
  Aptitude:["Quant Basics","Probability","Number Series","Logical Reasoning"],
  DSA:["Arrays","Trees","Graphs","Dynamic Programming"],
  DBMS:["Normalization","SQL Queries","Transactions"],
  Programming:["OOP","Operating Systems","Computer Networks"]
};

const resetForm = () => {
  setTitle("");
  setDuration("");
  setModule("");
  setTopic("");
  setCompany("");
};

const handleCreate = () => {

if(!title || !duration){
  alert("Fill all required fields");
  return;
}

// ✅ MODULE TEST VALIDATION
if(type==="module"){
  if(!module || !topic){
    alert("Select module and topic");
    return;
  }
}

// ✅ COMPANY TEST VALIDATION
if(type==="company"){
  if(!company){
    alert("Select company");
    return;
  }
}

const testData = {
  name: title,
  duration: Number(duration),
  type,
  difficulty
};

// 🔥 ONLY ADD THESE WHEN REQUIRED
if(type==="module"){
  testData.module = module;
  testData.topic = topic;
}

if(type==="company"){
  testData.company = company;
}

createTest(testData);

alert("Test created successfully");
resetForm();
};

return(

<div className="dashboard-layout">

<AdminSidebar/>

<div className="dashboard-main">

<h1 className="page-title">Create Test</h1>

<div className="builder-card">

<div className="form-group">
<label>Test Name</label>
<input
value={title}
onChange={(e)=>setTitle(e.target.value)}
placeholder="Example: TCS Mock Test"
/>
</div>

<div className="form-group">
<label>Duration (minutes)</label>
<input
type="number"
value={duration}
onChange={(e)=>setDuration(e.target.value)}
placeholder="90"
/>
</div>

<div className="form-group">
<label>Test Type</label>
<select
value={type}
onChange={(e)=>{
  setType(e.target.value);
  setModule("");
  setTopic("");
  setCompany("");
}}
>
<option value="module">Module Test</option>
<option value="company">Company Mock</option>
</select>
</div>

<div className="form-group">
<label>Difficulty</label>
<select
value={difficulty}
onChange={(e)=>setDifficulty(e.target.value)}
>
<option value="easy">Easy</option>
<option value="medium">Medium</option>
<option value="hard">Hard</option>
</select>
</div>

{/* ✅ MODULE TEST UI */}
{type==="module" && (
<>
<div className="form-group">
<label>Module</label>
<select
value={module}
onChange={(e)=>{
  setModule(e.target.value);
  setTopic("");
}}
>
<option value="">Select Module</option>
{Object.keys(modules).map(m=>(
<option key={m}>{m}</option>
))}
</select>
</div>

<div className="form-group">
<label>Topic</label>
<select
value={topic}
onChange={(e)=>setTopic(e.target.value)}
>
<option value="">Select Topic</option>
{module && modules[module].map(t=>(
<option key={t}>{t}</option>
))}
</select>
</div>
</>
)}

{/* ✅ COMPANY TEST UI */}
{type==="company" && (
<div className="form-group">
<label>Company</label>
<select
value={company}
onChange={(e)=>setCompany(e.target.value)}
>
<option value="">Select Company</option>
<option>TCS</option>
<option>IBM</option>
<option>Accenture</option>
<option>Wipro</option>
<option>Deloitte</option>
</select>
</div>
)}

<button className="primary-btn" onClick={handleCreate}>
Create Test
</button>

</div>

</div>

</div>

);
}

export default CreateTest;