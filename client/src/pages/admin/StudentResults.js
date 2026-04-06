import { useEffect, useState } from "react";

export default function AdminResults() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/analytics/admin", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="page">
      <h2>Admin Results Dashboard</h2>

      <div className="stats">
        <div>Total Tests: {data.totalTests}</div>
        <div>Total Students: {data.totalStudents}</div>
        <div>Avg Score: {Math.round(data.avgScore)}%</div>
      </div>

      <h3>Student Performance</h3>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Tests</th>
            <th>Avg Score</th>
          </tr>
        </thead>
        <tbody>
          {data.students.map((s, i) => (
            <tr key={i}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.tests}</td>
              <td>{s.avgScore}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}