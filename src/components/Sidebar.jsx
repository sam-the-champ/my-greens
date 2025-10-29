// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LogOut,
  Leaf,
  ShoppingBag,
  User,
  Settings,
  BarChart2,
  Menu,
  X,
  Newspaper,
} from "lucide-react";
import { motion } from "framer-motion";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // optional: navigate after logout if you want (not added per your request)
  // const navigate = useNavigate();

  return (
    <div className="bg-gray-800">
      {/* Mobile Toggle Button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="text-gray-100 bg-gray-800 p-2 rounded-lg"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Overlay (for mobile when sidebar is open) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-gray-800 bg-opacity-60 z-40 lg:hidden"
        />
        
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen || window.innerWidth >= 1024 ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="fixed top-0 left-0 h-screen w-64 bg-[#0d0d0d] text-white flex flex-col justify-between shadow-xl z-50 lg:translate-x-0 rounded-r-2xl"
      >
        {/* Top / Logo */}
        <div className="p-6 text-2xl font-bold tracking-wide border-b border-gray-800 flex justify-between">
          🌱 GreenScore
          <X
            className="text-gray-400 cursor-pointer ml-3 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        </div>
          

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-6">
          <Link
            to="/Dashboard"
            className="flex items-center gap-3 hover:text-green-400 transition"
            onClick={() => setIsOpen(false)}
          >
            <BarChart2 size={20} /> Dashboard
          </Link>

          <Link
            to="/CarbonTracker"
            className="flex items-center gap-3 hover:text-green-400 transition"
            onClick={() => setIsOpen(false)}
          >
            <Leaf size={20} /> Carbon Tracker
          </Link>

          <Link
            to="/EcoMarket"
            className="flex items-center gap-3 hover:text-green-400 transition"
            onClick={() => setIsOpen(false)}
          >
            <ShoppingBag size={20} /> Eco Market
          </Link>

          <Link
            to="/Profile"
            className="flex items-center gap-3 hover:text-green-400 transition"
            onClick={() => setIsOpen(false)}
          >
            <User size={20} /> Profile
          </Link>

          <Link
            to="/Blog"
            className="flex items-center gap-3 hover:text-green-400 transition"
            onClick={() => setIsOpen(false)}
          >
            <Newspaper size={20} /> Blog
          </Link>
        </nav>

        {/* Footer / Logout */}
        <div className="p-6 border-t border-gray-800">
          {user && (
            <button
              onClick={logout}
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              <LogOut size={18} /> <span>Logout</span>
            </button>
          )}
        </div>
        <div className="p-32 md:p-30 lg:p-24"></div>
      </motion.aside>
    </div>
  );
};

export default Sidebar;
