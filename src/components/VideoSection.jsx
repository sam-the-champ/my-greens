import React from "react";
import { motion } from "framer-motion";

const VideoSection = () => {
  return (
    <motion.div
      className="bg-[#111] rounded-2xl mt-10 p-6 border border-gray-800 shadow-xl"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h3 className="text-gray-200 text-lg mb-4">Learn About Carbon Footprint</h3>
      <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden border border-gray-700">
        <iframe
          className="w-full h-80 rounded-lg"
          src="https://www.youtube.com/embed/8q7_aV8eLUE"
          title="Carbon Footprint Explained"
          allowFullScreen
        ></iframe>
      </div>
    </motion.div>
  );
};

export default VideoSection;
