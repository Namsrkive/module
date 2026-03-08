import { motion } from "framer-motion";

export default function CompanyTestCard({ company, openModal }) {

  return (

    <motion.div
      className="company-card"
      whileHover={{ scale: 1.05 }}
      onClick={() => openModal(company)}
    >

      <h3>{company.name}</h3>

      <p>{company.focus}</p>

      <span className="difficulty">
        Difficulty: {company.level}
      </span>

    </motion.div>

  );

}