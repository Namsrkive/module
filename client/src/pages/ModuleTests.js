import Sidebar from "../components/dashboard/Sidebar";
import { useNavigate } from "react-router-dom";
import { getQuestionsByModuleTopic } from "../data/testStore";
import "../styles/test.css";

const modules = [
{
name: "Aptitude",
description: "Quantitative aptitude and logical reasoning",
tests: [
"Quant Basics",
"Probability",
"Number Series",
"Logical Reasoning"
]
},

{
name: "DSA",
description: "Data structures and algorithms",
tests: [
"Arrays",
"Trees",
"Graphs",
"Dynamic Programming"
]
},

{
name: "DBMS",
description: "Database management and SQL",
tests: [
"SQL Basics",
"Joins",
"Transactions",
"Normalization"
]
},

{
name: "Programming",
description: "Core programming and CS fundamentals",
tests: [
"OOP Concepts",
"Operating Systems",
"Computer Networks",
"Coding Problems"
]
}
];

export default function ModuleTests(){

const navigate = useNavigate();

return(

<div className="dashboard-layout">

<Sidebar/>

<div className="dashboard-main">

<div className="test-page-header">

<h1>Module Practice Tests</h1>

<p>
Practice individual topics before attempting full company mock exams.
</p>

</div>

<div className="modules-container">

{modules.map((module)=>(

<div key={module.name} className="module-card">

<div className="module-header">

<h2>{module.name}</h2>
<p>{module.description}</p>

</div>

<div className="topic-grid">

{module.tests.map((topic)=>{

/* Count questions dynamically */

const questions = getQuestionsByModuleTopic(module.name,topic);

const questionCount = questions.length;

return(

<div
key={topic}
className="topic-card"
onClick={()=>navigate(`/test/${module.name}/${topic}`)}
>

<h4>{topic}</h4>

<p className="topic-info">

{questionCount > 0
? `${questionCount} Questions • 20 Minutes`
: "No Questions Added Yet"}

</p>

<button
className="start-test-btn"
onClick={(e)=>{
e.stopPropagation();
navigate(`/test/${module.name}/${topic}`);
}}
>

Start Test

</button>

</div>

);

})}

</div>

</div>

))}

</div>

</div>

</div>

);

}