import { motion } from "framer-motion";

export default function ModuleTestCard({ module, syllabus, openModal }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="test-card"
      onClick={() => openModal(module)}
    >

      <h3>{module}</h3>

      <div className="hover-syllabus">
        {syllabus.map((s, i) => (
          <p key={i}>{s}</p>
        ))}
      </div>

    </motion.div>
  );
}