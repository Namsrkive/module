import DashboardLayout from "../layouts/DashboardLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar
} from "recharts";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const trendData = [
  { week: "W1", score: 55 },
  { week: "W2", score: 62 },
  { week: "W3", score: 70 },
  { week: "W4", score: 78 }
];

const radarData = [
  { subject: "Aptitude", value: 82 },
  { subject: "DSA", value: 74 },
  { subject: "DBMS", value: 69 },
  { subject: "Core CS", value: 80 }
];

const companyData = [
  { name: "TCS", score: 84 },
  { name: "IBM", score: 76 },
  { name: "Accenture", score: 79 },
  { name: "Wipro", score: 81 },
  { name: "Deloitte", score: 72 }
];

function StudentDashboard() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add("dashboard-theme");
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => {
      document.body.classList.remove("dashboard-theme");
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="loading-skeleton">
          Loading Placement Intelligence...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h2>Placement Intelligence Dashboard</h2>
          <p>Track. Analyze. Improve. Dominate your placement journey.</p>
        </div>

        <motion.div
          className="stat-counter"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <h1>78%</h1>
          <span>Overall Readiness</span>
        </motion.div>
      </div>

      {/* GRID */}
      <div className="extreme-grid">

        <div className="dashboard-card">
          <h3>Performance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <XAxis dataKey="week" stroke="var(--subtext)" />
              <YAxis stroke="var(--subtext)" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="var(--primary)"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-card">
          <h3>Skill Matrix</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar
                dataKey="value"
                stroke="var(--primary)"
                fill="var(--primary)"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-card">
          <h3>Company Readiness</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={companyData}>
              <XAxis dataKey="name" stroke="var(--subtext)" />
              <YAxis stroke="var(--subtext)" />
              <Tooltip />
              <Bar dataKey="score" fill="var(--primary)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      <button className="floating-btn">+ Start Test</button>

    </DashboardLayout>
  );
}

export default StudentDashboard;