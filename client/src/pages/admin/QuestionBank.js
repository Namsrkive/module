import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { addQuestion, getQuestions } from "../../data/testStore";

function QuestionBank() {

const [type,setType] = useState("mcq");
const [question,setQuestion] = useState("");
const [options,setOptions] = useState(["","","",""]);
const [answer,setAnswer] = useState("");

const questions = getQuestions();

const handleOptionChange = (index,value)=>{

const newOptions=[...options];
newOptions[index]=value;
setOptions(newOptions);

};

const handleAdd = ()=>{

const newQuestion={
id:Date.now(),
type,
question,
options,
answer
};

addQuestion(newQuestion);

setQuestion("");
setOptions(["","","",""]);
setAnswer("");

};

return(

<div className="dashboard-layout">

<AdminSidebar/>

<div className="dashboard-main">

<h1 className="page-title">Question Builder</h1>

<div className="builder-card">

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

<div className="form-group">

<label>Question</label>

<textarea
value={question}
onChange={(e)=>setQuestion(e.target.value)}
placeholder="Enter the question"
/>

</div>

{(type==="mcq" || type==="multiple") && (

<div className="options-grid">

{options.map((opt,i)=>(
<input
key={i}
placeholder={`Option ${i+1}`}
value={opt}
onChange={(e)=>handleOptionChange(i,e.target.value)}
/>
))}

</div>

)}

<div className="form-group">

<label>Correct Answer</label>

<input
value={answer}
onChange={(e)=>setAnswer(e.target.value)}
placeholder="Correct option"
/>

</div>

<button
className="primary-btn"
onClick={handleAdd}
>
Add Question
</button>

</div>

{/* QUESTION LIST */}

<div className="question-list">

{questions.map((q)=>(
<div
key={q.id}
className="question-card"
>

<h4>{q.type.toUpperCase()}</h4>

<p>{q.question}</p>

</div>
))}

</div>

</div>

</div>

);

}

export default QuestionBank;