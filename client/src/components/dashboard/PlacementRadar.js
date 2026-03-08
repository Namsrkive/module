import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer
} from "recharts";

export default function PlacementRadar({ data }) {

  return (

    <div className="chart-card">

      <h3>Skill Radar</h3>

      <ResponsiveContainer width="100%" height={360}>

        <RadarChart outerRadius={120} data={data}>

          <PolarGrid />

          <PolarAngleAxis dataKey="subject" tick={{fontSize:13}} />

          <Radar
            name="Skill"
            dataKey="score"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.5}
          />

        </RadarChart>

      </ResponsiveContainer>

    </div>

  );

}