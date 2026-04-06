import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { FileText, Award, Calendar } from "lucide-react"; // npm install lucide-react
import "../styles/result.css";

export default function StudentResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/results`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  if (loading) return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main loading">Fetching your history...</div>
    </div>
  );

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <header className="results-header">
          <h1 className="page-title">Performance History</h1>
          <p className="dashboard-sub">A detailed breakdown of all your completed assessments.</p>
        </header>

        {/* QUICK STATS */}
        {results.length > 0 && (
          <div className="results-summary-row">
             <div className="summary-pill">
                <FileText size={16} />
                <span><strong>{results.length}</strong> Tests Completed</span>
             </div>
             <div className="summary-pill">
                <Award size={16} />
                <span>Last Score: <strong>{results[0].score}%</strong></span>
             </div>
          </div>
        )}

        <div className="results-card">
          {results.length === 0 ? (
            <div className="empty-results">
              <Calendar size={48} />
              <p>You haven't attempted any tests yet.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="modern-results-table">
                <thead>
                  <tr>
                    <th>Assessment</th>
                    <th>Module</th>
                    <th>Score (%)</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i}>
                      <td className="test-name-cell">{r.testName}</td>
                      <td><span className="module-tag">{r.module || "General"}</span></td>
                      <td>
                        <div className={`score-badge ${r.score > 70 ? "high" : r.score > 40 ? "mid" : "low"}`}>
                          {r.score}%
                        </div>
                      </td>
                      <td>
                         <span className="status-text">Completed</span>
                      </td>
                      <td className="date-cell">
                        {new Date(r.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}