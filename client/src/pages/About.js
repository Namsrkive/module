import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

function About() {
  const { scrollY, scrollYProgress } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -80]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const Stat = ({ end, label, suffix = "" }) => {
    const { ref, inView } = useInView({ triggerOnce: true });

    return (
      <div ref={ref} className="stat-box">
        <h2>
          {inView ? <CountUp end={end} duration={2} /> : 0}
          {suffix}
        </h2>
        <p>{label}</p>
      </div>
    );
  };

  return (
    <div className="about-wrapper">

      {/* Scroll Progress */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
      />

      {/* HERO */}
      <section className="about-hero">
        <motion.div
          className="about-hero-content"
          style={{ y: heroY }}
        >
          <p className="eyebrow">ABOUT THE PLATFORM</p>

          <h1>
            Engineered for <br />
            Real-World Placement Success
          </h1>

          <p className="about-subtext">
            We replicate recruitment workflows, enforce integrity,
            and deliver structured analytics that empower institutions
            to measure and improve placement readiness.
          </p>
        </motion.div>
      </section>

      {/* STATS */}
      <motion.section
        className="about-stats"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Stat end={5000} label="Assessments Conducted" suffix="+" />
        <Stat end={120} label="Institutions Integrated" suffix="+" />
        <Stat end={95} label="Integrity Compliance" suffix="%" />
      </motion.section>

      <div className="section-divider-premium" />

      {/* FEATURES */}
      <motion.section
        className="about-feature-grid"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {[
          {
            title: "Simulation-Driven Assessments",
            text: "Assessments mirror actual hiring workflows under realistic time constraints."
          },
          {
            title: "AI-Based Proctoring",
            text: "Behavioral verification and monitoring ensure exam integrity."
          },
          {
            title: "Performance Intelligence",
            text: "Topic-level insights and readiness metrics guide improvement."
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            className="about-feature-card"
            whileHover={{ rotateX: 4, rotateY: -4, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.div>
        ))}
      </motion.section>

      <div className="section-divider-premium" />

      {/* TIMELINE */}
      <motion.section
        className="about-timeline"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>How It Works</h2>

        {[
          {
            step: "1",
            title: "Assessment Simulation",
            desc: "Students attempt structured company-modeled evaluations."
          },
          {
            step: "2",
            title: "Integrity Verification",
            desc: "Proctoring engine validates behavioral authenticity."
          },
          {
            step: "3",
            title: "Performance Analytics",
            desc: "System generates readiness metrics and insights."
          }
        ].map((item, index) => (
          <div key={index} className="timeline-row">
            <div className="timeline-step">{item.step}</div>
            <div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </motion.section>

    </div>
  );
}

export default About;