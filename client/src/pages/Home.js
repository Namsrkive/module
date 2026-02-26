import { useNavigate } from "react-router-dom";
 
function Home() {
  const navigate = useNavigate();
 
  return (
<div className="container">
 
      {/* HERO */}
<section className="hero-section">
<h1>
          Proctored Placement <span className="highlight">Readiness Portal</span>
</h1>
<p>
          Simulating real company recruitment exams with AI-based proctoring
          and advanced performance analytics.
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
</section>
 
      {/* MODULES */}
<section className="section">
<h2>The Four Pillars</h2>
 
        <div className="grid">
<div className="card">
<h3>Aptitude & Reasoning</h3>
<p>Quantitative, Logical & Verbal evaluation.</p>
</div>
 
          <div className="card">
<h3>DSA & Algorithms</h3>
<p>Problem solving & optimization techniques.</p>
</div>
 
          <div className="card">
<h3>DBMS & SQL</h3>
<p>Execution-based database evaluation.</p>
</div>
 
          <div className="card">
<h3>Programming & Core CS</h3>
<p>OOP, OS, CN & coding assessment.</p>
</div>
</div>
</section>
 
      {/* COMPANIES */}
<section className="section">
<h2>Company-Specific Simulations</h2>
 
        <div className="company-tags">
<div>TCS</div>
<div>IBM</div>
<div>Accenture</div>
<div>Wipro</div>
<div>Deloitte</div>
</div>
</section>
 
      {/* CTA */}
<section className="cta-section">
<h2>Start Your Placement Readiness Journey</h2>
 
        <button
          className="primary-btn"
          onClick={() => navigate("/login/student")}
>
          Begin Assessment
</button>
</section>
 
      <footer className="footer">
<div>© 2026 Proctored Placement Portal</div>
<div>
          About | Contact
</div>
</footer>
 
    </div>
  );
}
 
export default Home;