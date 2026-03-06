import React from "react";
import { motion } from "framer-motion";

export default function StatCard({ icon, title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="stat-card"
    >
      <div className="stat-icon">{icon}</div>
      <h3>{value}</h3>
      <p>{title}</p>
    </motion.div>
  );
}