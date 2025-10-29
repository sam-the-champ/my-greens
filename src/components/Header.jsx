import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useAuth();

  return (
    <motion.header
      className="flex justify-between items-center bg-[#111] rounded-2xl p-5 shadow-lg border border-gray-800 "
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div >
        <h2 className="text-xl font-semibold text-white">
          Welcome back,{" "}
          <span className="text-green-400">{user?.displayName || "Eco Hero"}</span> 🌱
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Let’s make the planet greener today.
        </p>
      </div>

      <Link to="/profile">
  <motion.div
    whileHover={{ scale: 1.1 }}
    className="bg-gray-900 p-3 rounded-full border border-gray-700 cursor-pointer"
  >
    <User className="text-green-400" size={24} />
  </motion.div>
</Link>
    </motion.header>
  );
};

export default Header;
