import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ChartSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // This will be replaced with Firestore fetch
    setData([
      { day: "Mon", score: 80 },
      { day: "Tue", score: 70 },
      { day: "Wed", score: 60 },
      { day: "Thu", score: 90 },
      { day: "Fri", score: 50 },
    ]);
  }, []);

  return (
    <motion.div
      className="bg-[#111] rounded-2xl p-6 mt-10 border border-gray-800 shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-gray-200 text-lg mb-6">Daily Carbon Score</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2f2f2f" />
          <XAxis dataKey="day" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip contentStyle={{ backgroundColor: "#111", border: "none" }} />
          <Line type="monotone" dataKey="score" stroke="#22c55e" strokeWidth={2.5} dot />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default ChartSection;
