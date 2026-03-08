import { useEffect, useState } from "react";

export default function ProgressRing({ score }) {

  const radius = 40;
  const stroke = 5;

  const normalizedRadius = radius - stroke * 2;

  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (score / 100) * circumference;

  return (

    <div className="progress-ring">

      <svg
        height={radius * 2}
        width={radius * 2}
      >

        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        <circle
          stroke="#6366f1"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="progress-ring-circle"
        />

      </svg>

      <div className="progress-ring-text">
        {score}%
      </div>

    </div>

  );
}