import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
 
function Home() {
  const navigate = useNavigate();
 
  return (
<div className="container">
 
      <section className="hero-section">
<h1>
          Proctored Placement <span className="highlight">Readiness Portal</span>
</h1>
<p>
          A unified assessment ecosystem simulating real company-level
          recruitment tests with AI-based proctoring and advanced analytics.
</p>
 
        <div className="hero-buttons">
<button
            className="primary-btn"
            onClick={() => navigate("/login/student")}
>
            Student Login
</button>
 
          <button
            className="primary-btn"
            onClick={() => navigate("/login/admin")}
>
            Admin Portal
</button>
</div>
</section>
 
      <motion.section
        className="module-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
>
<h2>The Four Pillars of Placement Readiness</h2>
 
        <div className="module-grid">
<div className="module-card">
<h3>Aptitude & Reasoning</h3>
<p>Quantitative, Logical & Verbal evaluation.</p>
</div>
 
          <div className="module-card">
<h3>DSA & Algorithms</h3>
<p>Problem solving & technical depth.</p>
</div>
 
          <div className="module-card">
<h3>DBMS & SQL</h3>
<p>Execution-based queries & database fundamentals.</p>
</div>
 
          <div className="module-card">
<h3>Programming & Core CS</h3>
<p>OOP, OS, CN & applied coding evaluation.</p>
</div>
</div>
</motion.section>
 
      <motion.section
        className="company-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
>
<h2>Company-Specific Simulations</h2>
 
        <div className="company-grid">
<div className="company-card">TCS</div>
<div className="company-card">IBM</div>
<div className="company-card">Accenture</div>
<div className="company-card">Wipro</div>
<div className="company-card">Deloitte</div>
</div>
</motion.section>
 
      <motion.section
        className="impact-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
>
<h2>Measurable Outcomes</h2>
 
        <div className="impact-grid">
<div>
<h3>90%+</h3>
<p>Improved Placement Readiness</p>
</div>
 
          <div>
<h3>5+</h3>
<p>Company Simulation Models</p>
</div>
 
          <div>
<h3>4</h3>
<p>Integrated Technical Modules</p>
</div>
</div>
</motion.section>
 
      <section className="cta-section">
<h2>Start Your Placement Journey</h2>
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
<span onClick={() => navigate("/about")}>About</span>
          {" | "}
<span onClick={() => navigate("/contact")}>Contact</span>
</div>
</footer>
</div>
  );
}
 
export default Home;