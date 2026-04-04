import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import "../../styles/adminPages.css";
import { getResults } from "../../data/testStore";

function Analytics() {

  const [data, setData] = useState({
    totalStudents: 0,
    avgScore: 0
  });

  useEffect(() => {

    const results = getResults();

    if (results.length === 0) return;

    const totalStudents = results.length;

    const avgScore =
      results.reduce((sum, r) => sum + r.score, 0) / totalStudents;

    setData({
      totalStudents,
      avgScore: avgScore.toFixed(2)
    });

  }, []);

  return (
    <div className="admin-container">

      <AdminSidebar />

      <div className="admin-content">
        <h2>Analytics Dashboard</h2>

        {data.totalStudents === 0 ? (
          <p>No analytics data available.</p>
        ) : (
          <div className="cards">
            <div className="card">
              Total Attempts: {data.totalStudents}
            </div>
            <div className="card">
              Avg Score: {data.avgScore}%
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Analytics;