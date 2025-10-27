// src/components/Header.jsx
import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { User } from "lucide-react";

const Header = () => {
  const { user } = useAuth();

  return (
    <motion.header
      className="flex items-center justify-between mb-8 bg-[#111] px-6 py-4 rounded-2xl shadow-lg "
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div>
        <h1 className="text-2xl font-semibold text-emerald-400">
          Welcome back, {user?.displayName || "Eco Hero"} 👋
        </h1>
        <p className="text-gray-400 text-sm mt-1">Let’s make today more sustainable 🌱</p>
      </div>

      <motion.div
        className="w-11 h-11 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition"
        whileHover={{ scale: 1.1 }}
      >
        <User size={22} className="text-emerald-400" />
      </motion.div>
    </motion.header>
  );
};

export default Header;
