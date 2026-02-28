import DashboardLayout from "../layouts/DashboardLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { useEffect } from "react";
import CountUp from "react-countup";

const trendData = [
  { week: "W1", score: 55 },
  { week: "W2", score: 62 },
  { week: "W3", score: 70 },
  { week: "W4", score: 78 }
];

const companyData = [
  { name: "TCS", score: 84 },
  { name: "IBM", score: 76 },
  { name: "Accenture", score: 79 },
  { name: "Wipro", score: 81 },
  { name: "Deloitte", score: 72 }
];

const skills = [
  { name: "Aptitude", value: 82 },
  { name: "DSA", value: 74 },
  { name: "DBMS", value: 69 },
  { name: "Core CS", value: 80 }
];

function StudentDashboard() {

  useEffect(() => {
    document.body.classList.add("dashboard-theme");
    return () => document.body.classList.remove("dashboard-theme");
  }, []);

  return (
    <DashboardLayout>

      {/* ================= ENTERPRISE TOP BAR ================= */}
      <div className="enterprise-topbar">

        <div>
          <h2>Placement Intelligence</h2>
          <span>Realtime analytics & readiness tracking</span>
        </div>

        <div className="enterprise-actions">
          <div className="bell">🔔</div>
          <div className="avatar">DS</div>
          <button className="enterprise-cta">
            + Start Test
          </button>
        </div>

      </div>

      {/* ================= KPI STRIP ================= */}
      <div className="enterprise-kpi-row">

        <div className="enterprise-kpi">
          <span>Readiness</span>
          <h1>
            <CountUp end={78} duration={2} />%
          </h1>
        </div>

        <div className="enterprise-kpi">
          <span>Tests</span>
          <h1>24</h1>
        </div>

        <div className="enterprise-kpi">
          <span>Average</span>
          <h1>76%</h1>
        </div>

        <div className="enterprise-kpi">
          <span>Rank</span>
          <h1>#12</h1>
        </div>

      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="enterprise-grid">

        {/* Trend */}
        <div className="enterprise-card">
          <h3>Performance Growth</h3>
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={trendData}>
              <XAxis dataKey="week" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#6366f1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Skills */}
        <div className="enterprise-card">
          <h3>Skill Strength</h3>
          {skills.map((skill, i) => (
            <div key={i} className="skill-row">
              <div className="skill-label">
                <span>{skill.name}</span>
                <span>{skill.value}%</span>
              </div>
              <div className="skill-bar">
                <div
                  className="skill-fill"
                  style={{ width: `${skill.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Company */}
        <div className="enterprise-card">
          <h3>Company Alignment</h3>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={companyData}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="score" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

    </DashboardLayout>
  );
}

export default StudentDashboard;