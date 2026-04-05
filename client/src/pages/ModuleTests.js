import Sidebar from "../components/dashboard/Sidebar";
import { useNavigate } from "react-router-dom";
import { getTestsByModuleTopic } from "../data/testStore";
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

// ✅ NEW LOGIC
const tests = getTestsByModuleTopic(module.name, topic);

return(

<div
key={topic}
className="topic-card"
onClick={()=>navigate(`/tests/${module.name}/${topic}`)}
>

<h4>{topic}</h4>

<p className="topic-info">

{tests.length > 0
? `${tests.length} Tests Available`
: "No Tests Available"}

</p>

<button
className="start-test-btn"
onClick={(e)=>{
e.stopPropagation();

if(tests.length > 0){
  navigate(`/tests/${module.name}/${topic}`);
} else {
  alert("No tests available");
}
}}
>

View Tests

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