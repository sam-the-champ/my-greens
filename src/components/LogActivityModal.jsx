// src/components/LogActivityModal.jsx
import React, { useState } from "react";

const LogActivityModal = ({ closeModal, onSubmit }) => {
  const [activity, setActivity] = useState({
    type: "transport",
    distance: "",
    kwh: "",
    meals: "",
  });

  const handleChange = (e) => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(activity);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#111] p-6 rounded-xl w-[90%] max-w-md border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-green-400">
          Log New Activity
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span>Activity Type</span>
            <select
              name="type"
              value={activity.type}
              onChange={handleChange}
              className="w-full bg-black/30 border border-gray-700 p-2 rounded mt-1"
            >
              <option value="transport">Transport</option>
              <option value="electricity">Electricity</option>
              <option value="diet">Diet</option>
            </select>
          </label>

          <label className="block">
            <span>Distance (km) / kWh / Meals</span>
            <input
              name={
                activity.type === "transport"
                  ? "distance"
                  : activity.type === "electricity"
                  ? "kwh"
                  : "meals"
              }
              value={
                activity.type === "transport"
                  ? activity.distance
                  : activity.type === "electricity"
                  ? activity.kwh
                  : activity.meals
              }
              onChange={handleChange}
              className="w-full bg-black/30 border border-gray-700 p-2 rounded mt-1"
              placeholder="Enter value"
            />
          </label>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogActivityModal;
