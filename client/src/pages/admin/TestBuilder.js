import AdminSidebar from "../../components/admin/AdminSidebar";
import { getTests,getQuestions,attachQuestionToTest } from "../../data/testStore";

function TestBuilder(){

const tests=getTests();
const questions=getQuestions();

const attach=(testId,questionId)=>{

attachQuestionToTest(testId,questionId);

alert("Question added to test");

};

return(

<div className="dashboard-layout">

<AdminSidebar/>

<div className="dashboard-main">

<h1>Test Builder</h1>

{tests.map(test=>(

<div
key={test.id}
className="builder-card"
>

<h2>{test.title}</h2>

<div className="question-list">

{questions.map(q=>(
<div
key={q.id}
className="question-card"
>

<p>{q.question}</p>

<button
className="primary-btn"
onClick={()=>attach(test.id,q.id)}
>
Add To Test
</button>

</div>
))}

</div>

</div>

))}

</div>

</div>

);

}

export default TestBuilder;