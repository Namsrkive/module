import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import "../../styles/adminPages.css";
import { getResults } from "../../data/testStore";

function StudentResults() {

  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(getResults());
  }, []);

  return (
    <div className="admin-container">

      <AdminSidebar />

      <div className="admin-content">
        <h2>Student Results</h2>

        {results.length === 0 ? (
          <p>No results available yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Test</th>
                <th>Score</th>
                <th>Accuracy</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {results.map((r) => (
                <tr key={r.id}>
                  <td>{r.studentName}</td>
                  <td>{r.testName}</td>
                  <td>{r.score}</td>
                  <td>{r.accuracy}%</td>
                  <td className={r.score > 50 ? "pass" : "fail"}>
                    {r.score > 50 ? "Pass" : "Fail"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
}

export default StudentResults;