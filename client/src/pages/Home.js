import { useNavigate } from "react-router-dom";
 
function Home() {
  const navigate = useNavigate();
 
  return (
<div className="container">
<div className="hero">
<h1>Proctored Placement Readiness Portal</h1>
<p>
          Simulate real company recruitment exams with AI-based proctoring.
          Track performance. Improve readiness.
</p>
 
        <div className="hero-buttons">
<button
            className="primary-btn"
            onClick={() => navigate("/login/student")}
>
            Student Login
</button>
 
          <button
            className="secondary-btn"
            onClick={() => navigate("/login/admin")}
>
            Admin Login
</button>
</div>
</div>
</div>
  );
}
 
export default Home;