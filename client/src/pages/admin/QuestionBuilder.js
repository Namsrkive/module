import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import "../../styles/dashboard.css";

function QuestionBuilder(){

const modules = {
  Aptitude:["Quant Basics","Probability","Number Series","Logical Reasoning"],
  DSA:["Arrays","Trees","Graphs","Dynamic Programming"],
  DBMS:["Normalization","SQL Queries","Transactions"],
  Programming:["OOP","Operating Systems","Computer Networks"]
}

const [questionType,setQuestionType] = useState("mcq");
const [module,setModule] = useState("");
const [topic,setTopic] = useState("");

const [form,setForm] = useState({
question:"",
optionA:"",
optionB:"",
optionC:"",
optionD:"",
correctAnswer:"",
starterCode:"",
expectedOutput:""
})

function handleChange(e){
setForm({
...form,
[e.target.name]:e.target.value
})
}

function handleSave(){

const newQuestion = {
module,
topic,
questionType,
...form
}

console.log("Saved Question:",newQuestion)

alert("Question Saved")

}

return(

<div className="dashboard-layout">

<AdminSidebar/>

<div className="dashboard-main">

<h1 className="page-title">Add Question</h1>

<div className="create-test-form">

{/* Module */}

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
<option key={m} value={m}>{m}</option>
))}

</select>

</div>


{/* Topic */}

<div className="form-group">

<label>Topic</label>

<select
value={topic}
onChange={(e)=>setTopic(e.target.value)}
>

<option value="">Select Topic</option>

{module && modules[module].map((t)=>(
<option key={t} value={t}>{t}</option>
))}

</select>

</div>


{/* Question Type */}

<div className="form-group">

<label>Question Type</label>

<select
value={questionType}
onChange={(e)=>setQuestionType(e.target.value)}
>

<option value="mcq">MCQ</option>
<option value="coding">Coding</option>

</select>

</div>


{/* Question */}

<div className="form-group">

<label>Question</label>

<textarea
name="question"
placeholder="Enter question"
onChange={handleChange}
/>

</div>


{/* MCQ Section */}

{questionType==="mcq" && (

<>

<div className="form-group">
<label>Option A</label>
<input
type="text"
name="optionA"
onChange={handleChange}
/>
</div>

<div className="form-group">
<label>Option B</label>
<input
type="text"
name="optionB"
onChange={handleChange}
/>
</div>

<div className="form-group">
<label>Option C</label>
<input
type="text"
name="optionC"
onChange={handleChange}
/>
</div>

<div className="form-group">
<label>Option D</label>
<input
type="text"
name="optionD"
onChange={handleChange}
/>
</div>

<div className="form-group">

<label>Correct Answer</label>

<select
name="correctAnswer"
onChange={handleChange}
>

<option value="">Select</option>
<option value="A">A</option>
<option value="B">B</option>
<option value="C">C</option>
<option value="D">D</option>

</select>

</div>

</>

)}


{/* Coding Section */}

{questionType==="coding" && (

<>

<div className="form-group">

<label>Allowed Languages</label>

<select multiple>

<option>Java</option>
<option>Python</option>
<option>C++</option>
<option>JavaScript</option>

</select>

</div>

<div className="form-group">

<label>Starter Code</label>

<textarea
name="starterCode"
placeholder="Provide starter code"
onChange={handleChange}
/>

</div>

<div className="form-group">

<label>Expected Output</label>

<textarea
name="expectedOutput"
placeholder="Enter expected output"
onChange={handleChange}
/>

</div>

</>

)}

<button
className="create-test-btn"
onClick={handleSave}
>

Save Question

</button>

</div>

</div>

</div>

)

}

export default QuestionBuilder;