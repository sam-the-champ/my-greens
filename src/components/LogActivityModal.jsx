// src/components/LogActivityModal.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const categoryUnits = {
  food: "kg",
  shopping: "kg",
  energy: "kWh",
  transportation: "km",
};

const LogActivityModal = ({ closeModal, onSubmit }) => {
  const [formData, setFormData] = useState({
    category: "food",
    value: "",
    description: "",
  });

  const unit = categoryUnits[formData.category];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.value || isNaN(formData.value)) {
      alert("Please enter a valid numeric value.");
      return;
    }
    onSubmit({
      category: formData.category,
      value: parseFloat(formData.value),
      description: formData.description,
      unit,
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#0f0f0f] border border-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md relative"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-green-400">Log Activity</h2>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-200 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
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
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-gray-200 focus:ring-2 focus:ring-green-500"
            >
              <option value="food">Food</option>
              <option value="energy">Energy</option>
              <option value="transportation">Transportation</option>
              <option value="shopping">Shopping</option>
            </select>
          </div>

          {/* Value */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Value ({unit})
            </label>
            <input
              type="number"
              step="0.01"
              name="value"
              value={formData.value}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-gray-200 focus:ring-2 focus:ring-green-500"
              placeholder={`Enter value in ${unit}`}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Description (optional)
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-gray-200 focus:ring-2 focus:ring-green-500"
              placeholder="E.g., Ate rice meal, drove 5km..."
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-green-600 hover:bg-green-700 text-black font-medium rounded-lg py-2 transition"
          >
            Save Activity
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default LogActivityModal;
