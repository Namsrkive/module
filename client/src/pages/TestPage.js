import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getQuestionsByModuleTopic } from "../data/testStore";

import TestLayout from "../components/test/TestLayout";
import CodeEditor from "../components/test/CodeEditor";
import ProctorPanel from "../components/test/ProctorPanel";

import "../styles/test.css";

function TestPage(){

const navigate = useNavigate();

const {module,topic} = useParams();

const questions = getQuestionsByModuleTopic(module,topic);

const [questionIndex,setQuestionIndex] = useState(0);
const [answers,setAnswers] = useState({});

if(!questions || questions.length===0){

return(

<TestLayout>

<h2>No Questions Found</h2>

</TestLayout>

);

}

const question = questions[questionIndex];

const selectOption=(option)=>{

setAnswers({
...answers,
[questionIndex]:option
});

};

const submitTest=()=>{

alert("Test Submitted");

navigate("/dashboard/modules");

};

return(

<TestLayout>

<div className="tcs-header">

<h3>{module} - {topic}</h3>

<div className="timer">20:00</div>

</div>

<div className="tcs-body">

<div className="tcs-left">

<h4>
Q{questionIndex+1}. {question.question}
</h4>

{question.type==="mcq" && (

<div className="options">

{question.options.map((opt,i)=>(
<div
key={i}
className={`option ${answers[questionIndex]===opt?"selected":""}`}
onClick={()=>selectOption(opt)}
>
{opt}
</div>
))}

</div>

)}

{question.type==="coding" && <CodeEditor/>}

</div>

<div className="tcs-right">

<div className="palette-grid">

{questions.map((q,i)=>(
<button
key={i}
className={`palette-btn ${questionIndex===i?"palette-current":""}`}
onClick={()=>setQuestionIndex(i)}
>
{i+1}
</button>
))}

</div>

<ProctorPanel/>

</div>

</div>

<div className="test-nav">

<button
onClick={()=>setQuestionIndex(p=>Math.max(p-1,0))}
>
Previous
</button>

<button
onClick={()=>setQuestionIndex(p=>Math.min(p+1,questions.length-1))}
>
Next
</button>

<button
className="submit-btn"
onClick={submitTest}
>
Submit Test
</button>

</div>

</TestLayout>

);

}

export default TestPage;