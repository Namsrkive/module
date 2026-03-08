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

      <ResponsiveContainer width="100%" height={320}>

        <RadarChart outerRadius={130} data={data}>

          <PolarGrid />

          <PolarAngleAxis dataKey="subject" tick={{fontSize:9}} />

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