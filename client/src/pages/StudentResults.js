import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/result.css";

function StudentResults() {

  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResults =
      JSON.parse(localStorage.getItem("results")) || [];

    // 🔥 REMOVE DUPLICATES (important)
    const seen = new Set();
    const uniqueResults = [];

    storedResults.forEach((r) => {
      const key = r.testId + r.date;

      if (!seen.has(key)) {
        seen.add(key);
        uniqueResults.push(r);
      }
    });

    // 🔥 LATEST FIRST
    uniqueResults.reverse();

    setResults(uniqueResults);
  }, []);

  if (results.length === 0) {
    return (
      <div className="result-page">
        <h2>No Results Found</h2>
      </div>
    );
  }

  return (
    <div className="result-page">

      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        <div className="result-header">
          <h2>My Test Results</h2>
          <p>Track your performance across all tests</p>
        </div>

        <div className="result-card">
          {/* table */}
        </div>

        <table className="result-table">

          <thead>
            <tr>
              <th>Test</th>
              <th>Score</th>
              <th>Percentage</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {results.map((res, index) => (
              <tr key={index} className="result-row">

                <td className="test-name">
                  {res.testTitle}
                </td>

                <td className="score">
                  {res.score}/{res.total}
                </td>

                <td
                  className={`percentage ${
                    res.percentage >= 60 ? "good" : "bad"
                  }`}
                >
                  {res.percentage}%
                </td>

                <td className="date">
                  {new Date(res.date).toLocaleString()}
                </td>

                <td>
                  <button
                    className="retake-btn"
                    onClick={() =>
                      navigate(`/test/${res.module}/${res.topic}`)
                    }
                  >
                    Retake
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default StudentResults;