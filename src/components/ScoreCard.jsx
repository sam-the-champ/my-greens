// src/components/ScoreCard.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import EarthImage from "../assets/earth.png";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

const ScoreCard = () => {
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(); // ✅ properly initialize Firebase Auth
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const today = new Date().toISOString().split("T")[0];
    const scoreRef = doc(db, "users", user.uid, "dailyScores", today);

    // ✅ Real-time listener for today's score
    const unsubscribe = onSnapshot(scoreRef, (docSnap) => {
      if (docSnap.exists()) {
        setScore(docSnap.data().score.toFixed(0));
      } else {
        setScore(0);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Score Circle */}
      <motion.div
        className="bg-[#111] rounded-2xl p-8 shadow-xl border border-gray-800 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h3 className="text-lg text-gray-300 mb-4">Your Carbon Score</h3>
        <div className="w-40 h-40">
          <CircularProgressbar
            value={loading ? 0 : score}
            text={loading ? "..." : `${score}%`}
            styles={buildStyles({
              pathColor: "#22c55e",
              textColor: "#fff",
              trailColor: "#2f2f2f",
            })}
          />
        </div>
        <p className="text-gray-400 text-sm mt-4">
          {loading
            ? "Fetching your latest activity..."
            : "Based on your recent activity"}
        </p>
      </motion.div>

      {/* Animated Earth */}
      <motion.div
        className="bg-[#111] rounded-2xl p-8 shadow-xl border border-gray-800 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <h3 className="text-lg text-gray-300 mb-4">Planet in Motion 🌍</h3>
        <motion.img
          src={EarthImage}
          alt="Earth"
          className="w-58 h-42"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-gray-400 text-sm mt-4">
          Keep reducing emissions to slow the spin.
        </p>
      </motion.div>
    </div>
  );
};

export default ScoreCard;
