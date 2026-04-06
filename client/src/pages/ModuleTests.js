import Sidebar from "../components/dashboard/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
"SQL Queries",
"Transactions",
"Normalization"
]
},

{
name: "Programming",
description: "Core programming and CS fundamentals",
tests: [
"OOP",
"Operating Systems",
"Computer Networks"
]
}
];

export default function ModuleTests(){

const navigate = useNavigate();

/* 🔥 NEW STATE */
const [topicIdMap, setTopicIdMap] = useState({});
const [testCountMap, setTestCountMap] = useState({});

/* 🔥 LOAD DATA FROM BACKEND */
useEffect(() => {
  const loadData = async () => {

    const modulesRes = await fetch("/api/modules");
    const modulesData = await modulesRes.json();

    let topicMap = {};
    let countMap = {};

    for (let mod of modulesData) {

      const topicsRes = await fetch(`/api/topics/${mod._id}`);
      const topics = await topicsRes.json();

      for (let t of topics) {
        topicMap[t.name] = t._id;

        const testsRes = await fetch(`/api/tests/topic/${t._id}`);
        const tests = await testsRes.json();

        countMap[t.name] = tests.length;
      }
    }

    setTopicIdMap(topicMap);
    setTestCountMap(countMap);
  };

  loadData();
}, []);

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

/* 🔥 REPLACED LOGIC */
const count = testCountMap[topic] || 0;
const topicId = topicIdMap[topic];

return(

<div
key={topic}
className="topic-card"
onClick={()=>{
  if(topicId){
    navigate(`/tests/topic/${topicId}`);
  }
}}
>

<h4>{topic}</h4>

<p className="topic-info">

{count > 0
? `${count} Tests Available`
: "No Tests Available"}

</p>

<button
className="start-test-btn"
onClick={(e)=>{
e.stopPropagation();

if(count > 0 && topicId){
  navigate(`/tests/topic/${topicId}`);
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