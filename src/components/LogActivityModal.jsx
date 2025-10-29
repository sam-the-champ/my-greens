import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { calculateCO2 } from "../utils/calculateCO2"; 

const categoryUnits = {
  food: "kg",
  transportation: "km",
  energy: "kWh",
  shopping: "item(s)",
};

const LogActivityModal = ({ closeModal }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    category: "",
    activity: "",
    quantity: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!user) {
    alert("You must be logged in to log an activity.");
    return;
  }

  setLoading(true);

  try {
    // Calculate CO₂ emission
    const co2Emission = calculateCO2(formData.category, parseFloat(formData.quantity));

    // Store in Firestore
    await addDoc(collection(db, "activities"), {
      userId: user.uid,
      ...formData,
      unit: categoryUnits[formData.category],
      co2Emission,
      date: new Date().toISOString().split("T")[0], // for daily chart
      timestamp: serverTimestamp(),
    });

    setFormData({ category: "", activity: "", quantity: "" });
    closeModal();
    alert(`Activity logged successfully! CO₂ emitted: ${co2Emission} kg`);
  } catch (error) {
    console.error("Error adding activity:", error);
    alert("Error logging activity. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
      >
        <motion.div
          className="bg-[#121212] text-white rounded-xl shadow-lg w-11/12 md:w-[450px] p-6 relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
          >
            <X size={22} />
          </button>

          <h2 className="text-xl font-semibold mb-4 text-green-400">
            Log Your Activity
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-gray-800 p-2 rounded-md text-sm border border-gray-700 focus:border-green-500 outline-none"
                required
              >
                <option value="">Select Category</option>
                <option value="food">Food</option>
                <option value="transportation">Transportation</option>
                <option value="energy">Energy</option>
                <option value="shopping">Shopping</option>
              </select>
            </div>

            {/* Activity */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Activity
              </label>
              <input
                type="text"
                name="activity"
                placeholder="e.g. Drove to work"
                value={formData.activity}
                onChange={handleChange}
                className="w-full bg-gray-800 p-2 rounded-md text-sm border border-gray-700 focus:border-green-500 outline-none"
                required
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Quantity ({formData.category ? categoryUnits[formData.category] : "unit"})
              </label>
              <input
                type="number"
                name="quantity"
                placeholder="Enter amount"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full bg-gray-800 p-2 rounded-md text-sm border border-gray-700 focus:border-green-500 outline-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-md font-medium mt-4"
            >
              {loading ? "Saving..." : "Submit"}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LogActivityModal;
