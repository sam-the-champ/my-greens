import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ScoreCard from "../components/ScoreCard";
import ChartSection from "../components/ChartSection";
import VideoSection from "../components/VideoSection";
import InsightsSection from "../components/InsightsSection";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen text-white">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />

      {/* Main Dashboard Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-60 md:ml-60" : "ml-0 md:ml-60"
        }`}
      >
        {/* Header */}
        <div className="p-6 top-0 z-10">
          <Header toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content */}
        <main className="p-6 space-y-6">
          <ScoreCard />
          <ChartSection />
          <VideoSection />
          <InsightsSection />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
