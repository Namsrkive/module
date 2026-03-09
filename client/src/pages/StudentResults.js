import { useEffect, useState } from "react";

import "../styles/results.css";

function StudentResults() {

const [history,setHistory] = useState([]);

useEffect(()=>{

const stored =
JSON.parse(localStorage.getItem("testHistory")) || [];

setHistory(stored);

},[]);

return(

<div className="dashboard-page">

<h2 className="page-title">My Test Results</h2>

{history.length === 0 ? (

<div className="empty-state">
No tests attempted yet.
</div>

) : (

<table className="results-table">

<thead>

<tr>
<th>Test</th>
<th>Score</th>
<th>Accuracy</th>
<th>Date</th>
</tr>

</thead>

<tbody>

{history.map((test)=>{

const accuracy =
((test.totalScore / test.totalQuestions) * 100).toFixed(1);

return(

<tr key={test.id}>

<td>{test.title}</td>

<td>
{test.totalScore} / {test.totalQuestions}
</td>

<td>{accuracy}%</td>

<td>{test.date}</td>

</tr>

);

})}

</tbody>

</table>

)}

</div>

);

}

export default StudentResults;