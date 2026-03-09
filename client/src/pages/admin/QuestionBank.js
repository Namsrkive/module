import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { addQuestion, getQuestions, deleteQuestion } from "../../data/testStore";

function QuestionBank() {

const modules = {
Aptitude:["Quant Basics","Probability","Number Series","Logical Reasoning"],
DSA:["Arrays","Trees","Graphs","Dynamic Programming"],
DBMS:["Normalization","SQL Queries","Transactions"],
Programming:["OOP","Operating Systems","Computer Networks"]
};

/* =========================
STATE
========================= */

const [module,setModule] = useState("");
const [topic,setTopic] = useState("");

const [type,setType] = useState("mcq");
const [question,setQuestion] = useState("");
const [options,setOptions] = useState(["","","",""]);
const [answer,setAnswer] = useState("");

const [search,setSearch] = useState("");
const [filterModule,setFilterModule] = useState("");
const [filterTopic,setFilterTopic] = useState("");

const [refresh,setRefresh] = useState(false);

/* =========================
LOAD QUESTIONS
========================= */

const questions = getQuestions().filter((q)=>{

const matchSearch = q.question
.toLowerCase()
.includes(search.toLowerCase())

const matchModule = filterModule
? q.module === filterModule
: true

const matchTopic = filterTopic
? q.topic === filterTopic
: true

return matchSearch && matchModule && matchTopic

});

/* =========================
HANDLERS
========================= */

function handleOptionChange(index,value){

const newOptions=[...options];
newOptions[index]=value;
setOptions(newOptions);

}

function handleAdd(){

if(!module || !topic || !question) return

const newQuestion={
id:Date.now(),
module,
topic,
type,
question,
options,
answer
};

addQuestion(newQuestion);

/* reset form */

setQuestion("");
setOptions(["","","",""]);
setAnswer("");
setModule("");
setTopic("");

setRefresh(!refresh);

}

function handleDelete(id){

deleteQuestion(id);

setRefresh(!refresh);

}

function handleEdit(q){

setModule(q.module)
setTopic(q.topic)
setType(q.type)
setQuestion(q.question)
setOptions(q.options)
setAnswer(q.answer)

}

/* =========================
UI
========================= */

return(

<div className="dashboard-layout">

<AdminSidebar/>

<div className="dashboard-main">

<h1 className="page-title">Question Bank</h1>

<p style={{marginBottom:"25px",color:"#666"}}>
Add and manage questions for different modules and topics.
</p>

{/* =========================
QUESTION BUILDER
========================= */}

<div className="builder-card">

{/* MODULE */}

<div className="form-group">

<label>Module</label>

<select
value={module}
onChange={(e)=>{
setModule(e.target.value)
setTopic("")
}}
>

<option value="">Select Module</option>

{Object.keys(modules).map((m)=>(
<option key={m}>{m}</option>
))}

</select>

</div>

{/* TOPIC */}

<div className="form-group">

<label>Topic</label>

<select
value={topic}
onChange={(e)=>setTopic(e.target.value)}
>

<option value="">Select Topic</option>

{module && modules[module].map((t)=>(
<option key={t}>{t}</option>
))}

</select>

</div>

{/* TYPE */}

<div className="form-group">

<label>Question Type</label>

<select
value={type}
onChange={(e)=>setType(e.target.value)}
>

<option value="mcq">MCQ</option>
<option value="multiple">Multiple Correct</option>
<option value="numerical">Numerical</option>
<option value="short">Short Answer</option>
<option value="coding">Coding</option>

</select>

</div>

{/* QUESTION */}

<div className="form-group">

<label>Question</label>

<textarea
value={question}
onChange={(e)=>setQuestion(e.target.value)}
placeholder="Enter the question"
/>

</div>

{/* OPTIONS */}

{(type==="mcq" || type==="multiple") && (

<div className="options-grid">

{options.map((opt,i)=>(

<input
key={i}
placeholder={`Option ${String.fromCharCode(65+i)}`}
value={opt}
onChange={(e)=>handleOptionChange(i,e.target.value)}
/>

))}

</div>

)}

{/* ANSWER */}

<div className="form-group">

<label>Correct Answer</label>

<select
value={answer}
onChange={(e)=>setAnswer(e.target.value)}
>

<option value="">Select</option>

<option value="A">A</option>
<option value="B">B</option>
<option value="C">C</option>
<option value="D">D</option>

</select>

</div>

<button
className="primary-btn"
onClick={handleAdd}
>

Add Question

</button>

</div>

{/* =========================
FILTER BAR
========================= */}

<div className="question-controls">

<input
placeholder="Search questions..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<select
value={filterModule}
onChange={(e)=>setFilterModule(e.target.value)}
>

<option value="">All Modules</option>

{Object.keys(modules).map((m)=>(
<option key={m}>{m}</option>
))}

</select>

<select
value={filterTopic}
onChange={(e)=>setFilterTopic(e.target.value)}
>

<option value="">All Topics</option>

{filterModule && modules[filterModule].map((t)=>(
<option key={t}>{t}</option>
))}

</select>

</div>

{/* =========================
QUESTION LIST
========================= */}

<div className="question-list">

{questions.map((q)=>(

<div key={q.id} className="question-card">

<h4>{q.module} • {q.topic}</h4>

<p className="question-text">{q.question}</p>

<div className="question-actions">

<button
className="edit-btn"
onClick={()=>handleEdit(q)}
>
Edit
</button>

<button
className="delete-btn"
onClick={()=>handleDelete(q.id)}
>
Delete
</button>

</div>

</div>

))}

</div>

</div>

</div>

)

}

export default QuestionBank;