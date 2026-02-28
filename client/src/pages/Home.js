import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const modules = [
  {
    title: "Aptitude & Reasoning",
    desc: "Quantitative intelligence simulation workflows.",
    icon: "🧠"
  },
  {
    title: "Data Structures & Algorithms",
    desc: "High-performance coding evaluation engine.",
    icon: "⚙️"
  },
  {
    title: "DBMS & SQL Optimization",
    desc: "Database query intelligence benchmarking.",
    icon: "🗄️"
  },
  {
    title: "Core Programming & CS",
    desc: "System design & foundational CS assessment.",
    icon: "💻"
  }
];

function Home() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    setOffset({
      x: (e.clientX - innerWidth / 2) / 120,
      y: (e.clientY - innerHeight / 2) / 120
    });
  };

  return (
    <motion.div
      className="home-production"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <section
        className="hero-production"
        onMouseMove={handleMouseMove}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`
        }}
      >
        {/* LEFT SIDE */}
        <motion.div
          className="hero-left-production"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1>
            Proctored Placement<br />
            Readiness Platform
          </h1>

          <p>
            Institutional-grade evaluation infrastructure designed
            for measurable placement performance.
          </p>

          <div className="hero-buttons-production">
            <button
              className="btn-prod-primary"
              onClick={() => navigate("/login/student")}
            >
              Student Portal
            </button>

            <button
              className="btn-prod-secondary"
              onClick={() => navigate("/login/admin")}
            >
              Admin Console
            </button>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          className="hero-right-production"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="hero-right-production">
            <div className="unicorn-architecture">

              {/* DASHED DATA FLOW */}
              <svg className="unicorn-lines" viewBox="0 0 420 420">
                {[
                  { x: 70, y: 70 },
                  { x: 350, y: 70 },
                  { x: 70, y: 350 },
                  { x: 350, y: 350 }
                ].map((point, index) => (
                  <line
                    key={index}
                    className={active === index ? "line-active" : ""}
                    x1={point.x}
                    y1={point.y}
                    x2="210"
                    y2="210"
                  />
                ))}
              </svg>

              {/* MODULE CARDS */}
              {modules.map((mod, index) => (
                <motion.div
                  key={index}
                  className={`unicorn-module module-${index}`}
                  onMouseEnter={() => setActive(index)}
                  onMouseLeave={() => setActive(null)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 14 }}
                >
                  <div className="module-icon">{mod.icon}</div>
                  <h3>{mod.title}</h3>
                  <p>{mod.desc}</p>
                </motion.div>
              ))}

              {/* CORE */}
              <div className="unicorn-core">
                AI Intelligence Core
              </div>

            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}

export default Home;