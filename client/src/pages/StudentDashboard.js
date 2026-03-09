import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";

import ThemeToggle from "../components/dashboard/ThemeToggle";
import StatCard from "../components/dashboard/StatCard";
import ModuleTestCard from "../components/dashboard/ModuleTestCard";
import CompanyTestCard from "../components/dashboard/CompanyTestCard";
import TestInfoModal from "../components/dashboard/TestInfoModal";

import ScoreTrendChart from "../components/dashboard/ScoreTrendChart";
import ModulePerformanceChart from "../components/dashboard/ModulePerformanceChart";
import PlacementRadar from "../components/dashboard/PlacementRadar";

import WeakAreasCard from "../components/dashboard/WeakAreasCard";
import Leaderboard from "../components/dashboard/Leaderboard";
import ProgressRing from "../components/dashboard/ProgressRing";

import "../styles/dashboard.css";

export default function StudentDashboard({ children }) {

const [darkMode,setDarkMode] = useState(false);
const [selectedTest,setSelectedTest] = useState(null);

const toggleTheme = () => setDarkMode(!darkMode);

/* ================= CHILD PAGE MODE ================= */
/* If a child page (Results / Leaderboard / Analytics) is passed,
   render layout with sidebar only */

if(children){

return(

<div className={`dashboard-layout ${darkMode?"dark":"light"}`}>

<Sidebar/>

<div className="dashboard-main">

{children}

</div>

</div>

);

}

/* ================= DASHBOARD DATA ================= */

const modules = [

{
name:"Aptitude",
description:"Quantitative aptitude and reasoning",
route:"aptitude",
questions:25,
duration:"20 min",
level:"Medium",
syllabus:["Quant","Probability","Series","Reasoning"]
},

{
name:"DSA",
description:"Data structures and algorithms",
route:"dsa",
questions:20,
duration:"30 min",
level:"Hard",
syllabus:["Arrays","Trees","Graphs","DP"]
},

{
name:"DBMS",
description:"Database and SQL concepts",
route:"dbms",
questions:20,
duration:"25 min",
level:"Medium",
syllabus:["SQL","Normalization","Transactions","ER"]
},

{
name:"Programming",
description:"Coding and core CS fundamentals",
route:"programming",
questions:15,
duration:"30 min",
level:"Hard",
syllabus:["OOP","OS","CN","Coding"]
}

];

const companies = [

{
name:"TCS Mock",
focus:"Aptitude + Verbal + Basic Coding",
route:"tcs",
level:"Medium"
},

{
name:"IBM Mock",
focus:"Logical + DSA",
route:"ibm",
level:"Hard"
},

{
name:"Accenture Mock",
focus:"Mixed aptitude + technical",
route:"accenture",
level:"Medium"
},

{
name:"Wipro Mock",
focus:"Aptitude + OS + DBMS",
route:"wipro",
level:"Medium"
},

{
name:"Deloitte Mock",
focus:"Business Logic + Technical",
route:"deloitte",
level:"Hard"
}

];

const scoreTrend = [
{test:"TEST 1",score:50},
{test:"TEST 2",score:65},
{test:"TEST 3",score:72},
{test:"TEST 4",score:80}
];

const modulePerformance = [
{module:"Aptitude",accuracy:75},
{module:"DSA",accuracy:68},
{module:"DBMS",accuracy:55},
{module:"Prog.",accuracy:72}
];

const radarData = [
{subject:"Programming",score:50},
{subject:"DBMS",score:68},
{subject:"Aptitude",score:55},
{subject:"DSA",score:72}
];

const weakAreas = [
{topic:"SQL Joins",module:"DBMS"},
{topic:"Probability",module:"Aptitude"},
{topic:"Trees",module:"DSA"}
];

const readinessScore = 73;

/* ================= MAIN DASHBOARD UI ================= */

return(

<div className={`dashboard-layout ${darkMode?"dark":"light"}`}>

<Sidebar/>

<div className="dashboard-main">

<div className="dashboard-header">

<div>
<h1 className="page-title">Student Dashboard</h1>
<p>Track placement readiness and performance analytics</p>
</div>

<div className="header-right">

<div className="readiness-card">

<h4>Placement Readiness</h4>

<ProgressRing score={readinessScore}/>

</div>

<ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme}/>

</div>

</div>

<div className="stats-grid">

<StatCard title="Tests Taken" value="14" icon="📘"/>
<StatCard title="Accuracy" value="78%" icon="🎯"/>
<StatCard title="Strongest" value="DSA" icon="🔥"/>
<StatCard title="Weak Area" value="DBMS" icon="⚠️"/>

</div>

<div className="charts-grid">

<ScoreTrendChart data={scoreTrend}/>
<ModulePerformanceChart data={modulePerformance}/>
<PlacementRadar data={radarData}/>

</div>

<h2 className="section-title">Module Practice</h2>

<div className="test-grid">

{modules.map(m=>(

<ModuleTestCard
key={m.name}
module={m}
syllabus={m.syllabus}
openModal={()=>setSelectedTest(m)}
/>

))}

</div>

<h2 className="section-title">Company Mock Tests</h2>

<div className="test-grid">

{companies.map(c=>(

<CompanyTestCard
key={c.name}
company={c}
openModal={()=>setSelectedTest(c)}
/>

))}

</div>

<div className="bottom-grid">

<WeakAreasCard weakAreas={weakAreas}/>
<Leaderboard/>

</div>

</div>

<TestInfoModal
test={selectedTest}
close={()=>setSelectedTest(null)}
/>

</div>

);

}