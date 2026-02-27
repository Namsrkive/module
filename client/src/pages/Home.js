import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 }
  }
};

const data = [
  { name: "Week 1", score: 52 },
  { name: "Week 2", score: 60 },
  { name: "Week 3", score: 70 },
  { name: "Week 4", score: 78 }
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">

      {/* FLOATING SHAPES */}
      <div className="floating-shape shape-1" />
      <div className="floating-shape shape-2" />

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-layout">

          <div className="hero-left">
            <motion.h1
              className="animated-gradient-text"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Proctored Placement Readiness Portal
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Real company simulations. AI proctoring. Data-driven growth.
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <button
                className="primary-btn large"
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
            </motion.div>
          </div>

          <div className="hero-right">
            <div className="mock-dashboard glow-card">
              <h4>Placement Analytics</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                  <XAxis dataKey="name" stroke="var(--subtext)" />
                  <YAxis stroke="var(--subtext)" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="var(--primary)"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </section>

      {/* MODULES */}
      <motion.section
        className="section"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="section-header">
          <h2>The Four Pillars of Readiness</h2>
        </div>

        <motion.div
          className="modules-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
        >
          {[
            "Aptitude & Reasoning",
            "DSA & Algorithms",
            "DBMS & SQL",
            "Programming & Core CS"
          ].map((title) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="module-card glow-card tilt-card"
            >
              <h3>{title}</h3>
              <p>Advanced simulation-driven evaluation.</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="cta-section"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
      >
        <h2>Start Your Placement Journey</h2>
        <button
          className="primary-btn large"
          onClick={() => navigate("/login/student")}
        >
          Begin Assessment
        </button>
      </motion.section>
    </div>
  );
}

export default Home;