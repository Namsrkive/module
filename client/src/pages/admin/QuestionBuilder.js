import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import "../../styles/dashboard.css";

function QuestionBuilder(){

const [questionType,setQuestionType] = useState("mcq");

return(

<div className="dashboard-layout">

<AdminSidebar/>

<div className="dashboard-main">

<h1 className="page-title">Add Question</h1>

<div className="create-test-form">

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

<div className="form-group">

<label>Question</label>

<textarea placeholder="Enter question"/>

</div>

{questionType==="mcq" && (

<>

<div className="form-group">
<label>Option A</label>
<input type="text"/>
</div>

<div className="form-group">
<label>Option B</label>
<input type="text"/>
</div>

<div className="form-group">
<label>Option C</label>
<input type="text"/>
</div>

<div className="form-group">
<label>Option D</label>
<input type="text"/>
</div>

<div className="form-group">
<label>Correct Answer</label>

<select>
<option>A</option>
<option>B</option>
<option>C</option>
<option>D</option>
</select>

</div>

</>

)}

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

<textarea placeholder="Provide starter code"/>

</div>

<div className="form-group">

<label>Expected Output</label>

<textarea placeholder="Enter expected output"/>

</div>

</>

)}

<button className="create-test-btn">
Save Question
</button>

</div>

</div>

</div>

)

}

export default QuestionBuilder;