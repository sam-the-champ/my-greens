import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const InsightsSection = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    // You can later fetch from Firestore or external API
    setTips([
      "Turn off lights when not in use.",
      "Switch to renewable energy sources.",
      "Recycle and reuse materials.",
      "Opt for public transport or carpooling.",
    ]);
  }, []);

  return (
    <motion.div
      className="bg-[#111] rounded-2xl mt-10 p-6 border border-gray-800 shadow-xl"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-gray-200 text-lg mb-6">Eco Insights 🌍</h3>
      <ul className="space-y-3">
        {tips.map((tip, i) => (
          <li key={i} className="text-gray-400 flex items-center gap-3">
            <span className="text-green-500 text-xl">•</span>
            {tip}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default InsightsSection;
