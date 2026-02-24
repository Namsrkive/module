import { useNavigate } from "react-router-dom";
 
function Dashboard() {
  const navigate = useNavigate();
 
  const modules = ["Aptitude", "DSA", "DBMS", "Programming"];
  const companies = ["TCS", "IBM", "Accenture", "Wipro", "Deloitte"];
 
  return (
<div className="container">
<h1>Dashboard</h1>
 
      <h2>Module Tests</h2>
<div className="card-grid">
        {modules.map((module) => (
<div
            key={module}
            className="card"
            onClick={() => navigate("/test")}
>
            {module}
</div>
        ))}
</div>
 
      <h2 style={{ marginTop: "40px" }}>Company Simulations</h2>
<div className="card-grid">
        {companies.map((company) => (
<div
            key={company}
            className="card company-card"
            onClick={() => navigate("/test")}
>
            {company}
</div>
        ))}
</div>
</div>
  );
}
 
export default Dashboard;