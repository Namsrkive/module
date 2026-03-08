import { motion } from "framer-motion";

export default function ModuleTestCard({ module, syllabus, openModal }) {

  return (

    <motion.div
      className="test-card"
      whileHover={{ scale: 1.05 }}
      onClick={() => openModal(module)}
    >

      <h3>{module.name}</h3>

      <p className="test-desc">
        {module.description}
      </p>

      <div className="syllabus-hover">

        {syllabus.map((topic,i)=>(
          <span key={i}>{topic}</span>
        ))}

      </div>

    </motion.div>

  );

}