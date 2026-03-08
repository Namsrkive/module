import { useState } from "react";
import { getTests } from "../data/testStore";
import TestLayout from "../components/test/TestLayout";
import CodeEditor from "../components/test/CodeEditor";
import ProctorPanel from "../components/test/ProctorPanel";
import "../styles/test.css";

function TestPage() {

const tests = getTests();
const test = tests[0];

const [sectionIndex,setSectionIndex] = useState(0);
const [questionIndex,setQuestionIndex] = useState(0);

const section = test?.sections[sectionIndex];
const questions = test?.questions || [];
const question = questions[currentQuestion];
const [answers,setAnswers] = useState({});

const selectOption = (option)=>{
setAnswers({
...answers,
[questionIndex]:option
});
};

return(

<TestLayout>

<div className="tcs-header">

<h3>{test?.title}</h3>

<div className="timer">
90:00
</div>

</div>

<div className="tcs-body">

<div className="tcs-left">

<h4>
Q{questionIndex+1}. {question?.question}
</h4>

{question?.type==="mcq" && (

<div className="options">

{question.options.map((opt,i)=>(
<div
key={i}
className={`option ${
answers[questionIndex]===opt ? "selected" : ""
}`}
onClick={()=>selectOption(opt)}
>
{opt}
</div>
))}

</div>

)}

{question?.type==="coding" && (

<CodeEditor/>

)}

</div>

<div className="tcs-right">

<div className="palette-grid">

{section?.questions.map((q,i)=>(
<button
key={i}
className={`palette-btn ${
questionIndex===i ? "palette-current":""
}`}
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
onClick={()=>setQuestionIndex((p)=>Math.max(p-1,0))}
>
Previous
</button>

<button
onClick={()=>setQuestionIndex((p)=>p+1)}
>
Next
</button>

<button className="submit-btn">
Submit Test
</button>

</div>

</TestLayout>

);

}

export default TestPage;