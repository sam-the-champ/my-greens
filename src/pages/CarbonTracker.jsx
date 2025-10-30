// src/pages/CarbonTracker.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import LogActivityModal from "../components/LogActivityModal";
import { calculateCO2 } from "../utils/calculateCO2";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

const CarbonTracker = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activities, setActivities] = useState([]);
  const [totalEmission, setTotalEmission] = useState(0);
  const [score, setScore] = useState(0);
  const user = auth.currentUser;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fetch today's activities from Firestore
  useEffect(() => {
    const fetchActivities = async () => {
      if (!user) return;
      const today = new Date().toISOString().split("T")[0];
      const activitiesRef = collection(db, "users", user.uid, "activities");
      const snapshot = await getDocs(activitiesRef);
      const data = snapshot.docs.map((doc) => doc.data());

      // Filter today's activities
      const todayActivities = data.filter(
        (a) => a.date === today
      );

      setActivities(todayActivities);

      const total = todayActivities.reduce(
        (sum, a) => sum + a.co2Emission,
        0
      );
      setTotalEmission(total);
      calculateAndSaveScore(total);
    };

    fetchActivities();
  }, [user]);

  // Calculate daily score (0–100)
  const calculateAndSaveScore = async (total) => {
    if (!user) return;
    const maxCO2 = 100; // baseline for scaling, can be tuned
    const generatedScore = Math.max(0, 100 - (total / maxCO2) * 100);
    setScore(generatedScore.toFixed(0));

    const today = new Date().toISOString().split("T")[0];
    const scoreRef = doc(db, "users", user.uid, "dailyScores", today);

    await setDoc(scoreRef, {
      date: today,
      score: generatedScore,
      totalEmission: total,
      updatedAt: serverTimestamp(),
    });
  };

  // Handle new activity logging
  const handleAddActivity = async (activity) => {
    if (!user) return;

    const co2Emission = calculateCO2(activity.category, activity.value);
    const today = new Date().toISOString().split("T")[0];
    const activityData = {
      ...activity,
      co2Emission,
      date: today,
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, "users", user.uid, "activities"), activityData);

    setActivities((prev) => [...prev, activityData]);
    const newTotal = totalEmission + co2Emission;
    setTotalEmission(newTotal);
    calculateAndSaveScore(newTotal);
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-4 sm:p-6 space-y-8">
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

        <section className="grid md:grid-cols-[65%_35%] gap-6">
          {/* Left Column */}
          <div className="bg-[#111] p-6 rounded-xl shadow-md border border-gray-800 space-y-6">
            <div className="flex flex-col items-center justify-center text-center">
              <motion.div
                className="w-40 h-40 border-8 border-green-500 rounded-full flex items-center justify-center text-3xl font-bold text-green-400 shadow-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {score || 0}%
              </motion.div>
              <p className="text-gray-400 mt-3">Today's CO₂ Score</p>
            </div>

            {/* Activities Table */}
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
              Based on your recent activities, you’re trending{" "}
              {totalEmission < 50 ? "great 🌱" : "a bit high 🔥"}. Try reducing
              emissions from transportation for better results.
            </p>
            <div className="bg-[#0f0f0f] border border-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm">
                Tip of the day: Switch off unused appliances to save energy!
              </p>
            </div>
          </div>
        </section>
      </main>

      {isModalOpen && (
        <LogActivityModal closeModal={closeModal} onSubmit={handleAddActivity} />
      )}
    </div>
  );
};

export default CarbonTracker;
