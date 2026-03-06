import React from "react";

export default function WeakAreasCard({ weakAreas }) {
  return (
    <div className="weak-card">
      <h3>Weak Areas</h3>

      <ul>
        {weakAreas.map((area, i) => (
          <li key={i}>
            {area.topic} — {area.module}
          </li>
        ))}
      </ul>
    </div>
  );
}