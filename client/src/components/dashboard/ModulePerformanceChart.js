import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ModulePerformanceChart({ data }) {
  return (
    <div className="chart-card">
      <h3>Module Performance</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="module" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="accuracy" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}