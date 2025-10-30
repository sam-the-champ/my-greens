import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import LogActivityModal from "../components/LogActivityModal";
import calculateCO2 from "../utils/calculateCO2";
import { db } from "../firebase"; // your Firebase config file
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext"; // assumes you have user auth context

const CarbonTracker = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activities, setActivities] = useState([]);
  const [totalEmission, setTotalEmission] = useState(0);

  const { currentUser } = useAuth(); // get current logged-in user

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 🔹 Fetch user activities from Firestore
  useEffect(() => {
    if (!currentUser) return;
    const fetchData = async () => {
      const q = query(
        collection(db, "carbonActivities"),
        where("userId", "==", currentUser.uid)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => doc.data());
      setActivities(data);

      // Calculate total
      const total = data.reduce((sum, act) => sum + (act.co2Emission || 0), 0);
      setTotalEmission(total);
    };

    fetchData();
  }, [currentUser]);

  // 🔹 Add new activity
  const handleAddActivity = async (activity) => {
    const co2Emission = calculateCO2(activity);
    const newActivity = { ...activity, co2Emission, userId: currentUser.uid };

    await addDoc(collection(db, "carbonActivities"), newActivity);
    setActivities((prev) => [...prev, newActivity]);
    setTotalEmission((prev) => prev + co2Emission);
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      <Sidebar />

      <main className="flex-1 ml-64 p-6 space-y-10">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-800 pb-4">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-2xl font-semibold tracking-wide text-green-400"
          >
            Carbon Tracker
          </motion.h1>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openModal}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg shadow-md font-medium"
          >
            <PlusCircle size={20} /> Log Activity
          </motion.button>
        </div>

        {/* Main Content */}
        <section className="grid md:grid-cols-[65%_35%] gap-6">
          {/* Left Column */}
          <div className="bg-[#111] p-6 rounded-xl shadow-md border border-gray-800 space-y-6">
            {/* CO2 Score */}
            <div className="flex flex-col items-center justify-center text-center">
              <motion.div
                className="w-40 h-40 border-8 border-green-500 rounded-full flex items-center justify-center text-3xl font-bold text-green-400 shadow-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {totalEmission.toFixed(1)} kg
              </motion.div>
              <p className="text-gray-400 mt-3">Today's CO₂ Emission</p>
            </div>

            {/* Activity Log */}
            <div>
              <h2 className="text-lg font-semibold mb-3 text-green-400">
                Activity Log
              </h2>
              {activities.length > 0 ? (
                <table className="w-full text-left border-collapse text-gray-300">
                  <thead className="border-b border-gray-700">
                    <tr>
                      <th className="pb-2">Category</th>
                      <th className="pb-2">Value</th>
                      <th className="pb-2">Unit</th>
                      <th className="pb-2">CO₂ (kg)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((act, i) => (
                      <tr key={i} className="border-b border-gray-800">
                        <td className="py-2">{act.category}</td>
                        <td className="py-2">{act.value}</td>
                        <td className="py-2">{act.unit}</td>
                        <td className="py-2 text-green-400 font-medium">
                          {act.co2Emission.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-400">
                  No activities logged yet. Add one!
                </p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-[#111] p-6 rounded-xl shadow-md border border-gray-800 space-y-4">
            <h2 className="text-lg font-semibold text-green-400">Insights 🌿</h2>
            <p className="text-gray-300">
              Based on your activities, you're trending{" "}
              {totalEmission < 50 ? "great 🌱" : "a bit high 🔥"}.
            </p>
            <div className="bg-[#0f0f0f] border border-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm">
                Tip: Switch off unused appliances to save energy!
              </p>
            </div>
          </div>
        </section>
      </main>

      {isModalOpen && (
        <LogActivityModal closeModal={closeModal} onSave={handleAddActivity} />
      )}
    </div>
  );
};

export default CarbonTracker;
