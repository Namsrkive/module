import { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/Sidebar";

import ThemeToggle from "../components/dashboard/ThemeToggle";
import StatCard from "../components/dashboard/StatCard";
import TestInfoModal from "../components/dashboard/TestInfoModal";

import ScoreTrendChart from "../components/dashboard/ScoreTrendChart";
import ModulePerformanceChart from "../components/dashboard/ModulePerformanceChart";
import PlacementRadar from "../components/dashboard/PlacementRadar";

import WeakAreasCard from "../components/dashboard/WeakAreasCard";
import Leaderboard from "../components/dashboard/Leaderboard";
import ProgressRing from "../components/dashboard/ProgressRing";

import { getPublishedTests } from "../data/testStore";
import { useNavigate } from "react-router-dom";

import "../styles/dashboard.css";

export default function StudentDashboard({ children }) {

const [darkMode,setDarkMode] = useState(false);
const [selectedTest,setSelectedTest] = useState(null);
const [tests,setTests] = useState([]);

const navigate = useNavigate();

const toggleTheme = () => setDarkMode(!darkMode);

/* ================= LOAD TESTS ================= */

useEffect(() => {
  const data = getPublishedTests();
  setTests(data);
}, []);

/* ================= CHILD PAGE MODE ================= */

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

/* ================= STATIC DATA (UNCHANGED) ================= */

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

/* ================= UI ================= */

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

{/* ================= NEW SECTION ================= */}

<h2 className="section-title">Available Tests</h2>

<div className="test-grid">

{tests.length === 0 ? (

<div className="empty-state">
<h3>No Tests Available</h3>
<p>Admin has not published any tests yet.</p>
</div>

) : (

tests.map((test) => (

<div className="test-card" key={test.id}>

<div className="test-card-header">
<h3>{test.name}</h3>
<span className="difficulty">{test.difficulty}</span>
</div>

<div className="test-meta">
<p>📘 Module: {test.module}</p>
<p>📂 Topic: {test.topic}</p>
<p>⏱ Duration: {test.duration} mins</p>
<p>📝 Questions: {test.questions?.length || 0}</p>
</div>

<button
className="start-btn"
onClick={() =>
navigate(`/test/${test.module}/${test.topic}`)
}
>
Start Test
</button>

</div>

))

)}

</div>

{/* ================= BOTTOM ================= */}

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