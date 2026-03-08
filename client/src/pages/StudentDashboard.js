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

import "../styles/dashboard.css";

export default function StudentDashboard() {

const [darkMode,setDarkMode] = useState(false);
const [selectedTest,setSelectedTest] = useState(null);

const toggleTheme = () => setDarkMode(!darkMode);

/* MODULE DATA */

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

/* COMPANY MOCKS */

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

/* ANALYTICS DATA */

const scoreTrend = [
{test:"1",score:50},
{test:"2",score:65},
{test:"3",score:72},
{test:"4",score:80}
];

const modulePerformance = [
{module:"Aptitude",accuracy:75},
{module:"DSA",accuracy:68},
{module:"DBMS",accuracy:55},
{module:"Programming",accuracy:72}
];

const radarData = [
{subject:"Aptitude",score:75},
{subject:"DSA",score:68},
{subject:"DBMS",score:55},
{subject:"Programming",score:72}
];

const weakAreas = [
{topic:"SQL Joins",module:"DBMS"},
{topic:"Probability",module:"Aptitude"},
{topic:"Trees",module:"DSA"}
];

const readinessScore = 73;

/* UI */

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
<h4>Readiness</h4>
<div className="readiness-score">{readinessScore}%</div>
</div>

<ThemeToggle
darkMode={darkMode}
toggleTheme={toggleTheme}
/>

</div>

</div>

{/* STATS */}

<div className="stats-grid">

<StatCard title="Tests Taken" value="14" icon="📘"/>
<StatCard title="Accuracy" value="78%" icon="🎯"/>
<StatCard title="Strongest" value="DSA" icon="🔥"/>
<StatCard title="Weak Area" value="DBMS" icon="⚠️"/>

</div>

{/* ANALYTICS */}

<div className="charts-grid">

<ScoreTrendChart data={scoreTrend}/>
<ModulePerformanceChart data={modulePerformance}/>
<PlacementRadar data={radarData}/>

</div>

{/* MODULE TESTS */}

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

{/* COMPANY MOCKS */}

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

{/* BOTTOM */}

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