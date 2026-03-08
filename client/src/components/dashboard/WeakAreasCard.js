export default function WeakAreasCard({ weakAreas }) {

  return (

    <div className="weak-card">

      <h3>Weak Areas ⚠️</h3>

      <div className="weak-list">

        {weakAreas.map((area,i)=>(
          <div key={i} className="weak-item">

            <span className="weak-topic">
              {area.topic}
            </span>

            <span className="weak-module">
              {area.module}
            </span>

          </div>
        ))}

      </div>

    </div>

  );

}