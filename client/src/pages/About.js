function About() {
  return (
    <div className="home-wrapper">
      <div className="floating-shape shape-1" />
      <div className="floating-shape shape-2" />

      <section className="glass-section">
        <div className="section-header">
          <p className="eyebrow">About the Platform</p>
          <h2>Engineered for Real-World Placement Success</h2>
          <p>
            We replicate actual hiring patterns, enforce integrity, and provide
            structured performance analytics for measurable improvement.
          </p>
        </div>

        <div className="modules-grid">
          <div className="module-card">
            <h3>Simulation-Driven Design</h3>
            <p>
              Company-aligned assessments modeled after real recruitment
              workflows.
            </p>
          </div>

          <div className="module-card">
            <h3>AI-Based Proctoring</h3>
            <p>
              Face detection, activity monitoring, and tab tracking ensure
              authentic evaluations.
            </p>
          </div>

          <div className="module-card">
            <h3>Performance Intelligence</h3>
            <p>
              Topic-level insights and readiness scoring to guide preparation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;