import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/test.css";
function TestResult() {

const location = useLocation();
const navigate = useNavigate();

/* ================= GET RESULT DATA ================= */

const result = location.state || {};

const totalScore = result.score ?? result.totalScore ?? 0;
const totalQuestions = result.total ?? 0;

const accuracy =
totalQuestions > 0
? ((totalScore / totalQuestions) * 100).toFixed(1)
: result.accuracy ?? 0;

const sectionScores = result.sectionScores || [];
const testTitle = result.testTitle || "Mock Test";

/* ================= PERFORMANCE LABEL ================= */

const getPerformanceLabel = () => {
if (accuracy >= 85) return "Excellent";
if (accuracy >= 70) return "Good";
if (accuracy >= 50) return "Average";
return "Needs Improvement";
};

const performance = getPerformanceLabel();
const readinessScore = Math.round((accuracy / 100) * 10);

/* ================= SAVE ATTEMPT ================= */
useEffect(() => {

if (!location.state) return;

/* prevent duplicate save */

const existing =
JSON.parse(localStorage.getItem("testHistory")) || [];

const alreadySaved = existing.some(
test => test.id === result.id 
);

if(alreadySaved) return;

const newAttempt = {
id: Date.now(),
title: testTitle,
totalScore,
totalQuestions,
accuracy,
sectionScores,
date: new Date().toLocaleString()
};

localStorage.setItem(
"testHistory",
JSON.stringify([newAttempt, ...existing])
);

// eslint-disable-next-line
}, []);
/* ================= UI ================= */

return (

<div className="result-container">

<h2>Test Result Summary</h2>

<div className="result-overview">

<div className="result-card">
<h3>Total Score</h3>
<p>{totalScore} / {totalQuestions}</p>
</div>

<div className="result-card">
<h3>Accuracy</h3>
<p>{accuracy}%</p>
</div>

<div className="result-card">
<h3>Readiness Score</h3>
<p>{readinessScore} / 10</p>
</div>

<div className="result-card">
<h3>Performance</h3>
<p>{performance}</p>
</div>

</div>

{sectionScores.length > 0 && (

<>

<h3>Section-wise Breakdown</h3>

<div className="section-breakdown">

{sectionScores.map((sec, index) => {

const secAccuracy =
((sec.score / sec.total) * 100).toFixed(1);

return (

<div key={index} className="section-card">

<h4>{sec.section}</h4>

<p>Score: {sec.score} / {sec.total}</p>

<p>Accuracy: {secAccuracy}%</p>

</div>

);

})}

</div>

</>

)}

<div className="result-actions">

<button
className="secondary-btn"
onClick={() => navigate("/dashboard/modules")}
>
Back to Modules
</button>

<button
className="primary-btn"
onClick={() => navigate("/dashboard/student")}
>
Go to Dashboard
</button>

</div>

</div>

);

}

export default TestResult;