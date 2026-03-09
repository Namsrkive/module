import { useEffect, useState } from "react";
import "../styles/leaderboard.css";

function LeaderboardPage() {

const [leaders,setLeaders] = useState([]);

useEffect(()=>{

const history =
JSON.parse(localStorage.getItem("testHistory")) || [];

/* ===== CALCULATE SCORES ===== */

const scores = {};

history.forEach((test)=>{

const student = "Namrata"; // temporary until login system added

if(!scores[student]){
scores[student] = 0;
}

scores[student] += test.totalScore;

});

/* ===== CONVERT TO ARRAY ===== */

const leaderboard = Object.entries(scores).map(
([name,score])=>({
name,
score
})
);

/* ===== SORT ===== */

leaderboard.sort((a,b)=>b.score - a.score);

setLeaders(leaderboard);

},[]);

return(

<div className="leaderboard-page">

<h2>Leaderboard</h2>

<table className="leaderboard-table">

<thead>

<tr>
<th>Rank</th>
<th>Student</th>
<th>Total Score</th>
</tr>

</thead>

<tbody>

{leaders.map((player,index)=>(

<tr key={index}>

<td>{index+1}</td>

<td>{player.name}</td>

<td>{player.score}</td>

</tr>

))}

</tbody>

</table>

</div>

);

}

export default LeaderboardPage;