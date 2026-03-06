import Sidebar from "../components/dashboard/Sidebar";
import ModuleTestCard from "../components/dashboard/ModuleTestCard";
import CompanyTestCard from "../components/dashboard/CompanyTestCard";
import ModulePerformanceChart from "../components/dashboard/ModulePerformanceChart";
import ScoreTrendChart from "../components/dashboard/ScoreTrendChart";
import WeakAreasCard from "../components/dashboard/WeakAreasCard";
import Leaderboard from "../components/dashboard/Leaderboard";

import { useState } from "react";

export default function StudentDashboard() {

  const [selectedTest, setSelectedTest] = useState(null);

  const modules = [
    {
      module: "Aptitude",
      syllabus: ["Quant", "Logical", "Verbal"],
    },
    {
      module: "DSA",
      syllabus: ["Arrays", "Trees", "Graphs"],
    },
    {
      module: "DBMS",
      syllabus: ["SQL", "ER Model", "Normalization"],
    },
    {
      module: "Programming",
      syllabus: ["OOP", "OS", "CN"],
    },
  ];

  const companies = [
    { company: "TCS", focus: "Aptitude + Verbal" },
    { company: "IBM", focus: "DSA + Logic" },
    { company: "Accenture", focus: "Mixed aptitude + coding" },
    { company: "Wipro", focus: "Aptitude + CS fundamentals" },
    { company: "Deloitte", focus: "Business logic" },
  ];

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-main">

        <h1>Student Dashboard</h1>

        <div className="charts-grid">
          <ScoreTrendChart />
          <ModulePerformanceChart />
        </div>

        <h2>Module Tests</h2>

        <div className="test-grid">
          {modules.map((m) => (
            <ModuleTestCard
              key={m.module}
              module={m.module}
              syllabus={m.syllabus}
              openModal={(test) => setSelectedTest({ name: test })}
            />
          ))}
        </div>

        <h2>Company Mock Tests</h2>

        <div className="test-grid">
          {companies.map((c) => (
            <CompanyTestCard
              key={c.company}
              company={c.company}
              focus={c.focus}
              openModal={(test) => setSelectedTest({ name: test })}
            />
          ))}
        </div>

        <div className="bottom-grid">
          <WeakAreasCard />
          <Leaderboard />
        </div>

      </div>

    </div>
  );
}