export default function Leaderboard(){

  const data = [
    {name:"Rahul",score:92},
    {name:"Priya",score:89},
    {name:"Amit",score:87},
    {name:"You",score:78}
  ];

  return(

    <div className="leaderboard-card">

      <h3>Leaderboard 🏆</h3>

      <div className="leaderboard-list">

        {data.map((p,i)=>(

          <div key={i} className="leaderboard-item">

            <span className="rank">
              {i+1}
            </span>

            <span className="name">
              {p.name}
            </span>

            <span className="score">
              {p.score}%
            </span>

          </div>

        ))}

      </div>

    </div>

  );

}