import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Menu,
  Edit3,
  Save,
  Bell,
  Shield,
  Star,
  Award,
  Settings,
} from "lucide-react";
import Sidebar from "../components/Sidebar"; // use your existing sidebar

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Olalekan Samson Ogundimu",
    email: "samson@example.com",
    location: "Lagos, Nigeria",
    bio: "Eco-conscious developer and sustainability advocate 🌱",
    ecoScore: 87,
    carbonSaved: 124.5,
  });

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <div className="flex ml-64 text-gray-100 min-h-screen">
      {/* Sidebar always visible */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Menu className="text-gray-400 lg:hidden" />
            <h2 className="text-2xl font-bold">My Profile</h2>
          </div>

          <button
            onClick={() => setEditing(!editing)}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-400 text-black px-4 py-2 rounded-md font-semibold hover:scale-105 transition"
          >
            {editing ? <Save size={16} /> : <Edit3 size={16} />}
            {editing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        {/* Profile Overview */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-850 p-6 rounded-xl border border-gray-800 shadow-lg flex flex-col md:flex-row gap-6 mb-8"
        >
          <div className="shrink-0 flex flex-col items-center">
            <img
              src="/userava.jpg"
              alt="User avatar"
              className="w-32 h-32 rounded-full border-4 border-green-400 object-cover"
            />
            <p className="mt-2 text-sm text-gray-400 italic">Eco Ambassador</p>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">Full Name</label>
                {editing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full bg-black/30 text-gray-100 p-2 rounded mt-1"
                  />
                ) : (
                  <p className="font-semibold">{profile.name}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-400">Email</label>
                {editing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full bg-black/30 text-gray-100 p-2 rounded mt-1"
                  />
                ) : (
                  <p>{profile.email}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-400">Location</label>
                {editing ? (
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className="w-full bg-black/30 text-gray-100 p-2 rounded mt-1"
                  />
                ) : (
                  <p>{profile.location}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm text-gray-400">Bio</label>
                {editing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    rows={3}
                    className="w-full bg-black/30 text-gray-100 p-2 rounded mt-1"
                  />
                ) : (
                  <p>{profile.bio}</p>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Eco Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-850 p-6 rounded-xl border border-gray-800 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-400">Eco Score</p>
              <h3 className="text-3xl font-bold text-green-400">
                {profile.ecoScore}
              </h3>
            </div>
            <Star className="text-green-400 w-10 h-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-850 p-6 rounded-xl border border-gray-800 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-400">Carbon Saved</p>
              <h3 className="text-3xl font-bold text-teal-400">
                {profile.carbonSaved} kg
              </h3>
            </div>
            <Leaf className="text-teal-400 w-10 h-10" />
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-850 p-6 rounded-xl border border-gray-800 mb-8"
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Award className="text-yellow-400" /> Achievements
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Plastic-Free Hero",
              "Solar Supporter",
              "Tree Planter",
              "Vegan Explorer",
            ].map((badge) => (
              <div
                key={badge}
                className="bg-black/30 p-4 rounded-lg text-center border border-gray-800 hover:scale-105 transition"
              >
                <p className="text-green-400 font-semibold">{badge}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Settings */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-850 p-6 rounded-xl border border-gray-800"
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Settings className="text-blue-400" /> Preferences
          </h3>
          <div className="flex flex-col gap-4">
            <label className="flex items-center justify-between bg-black/30 p-3 rounded-md">
              <span className="flex items-center gap-2">
                <Bell className="text-green-400" /> Notifications
              </span>
              <input
                type="checkbox"
                defaultChecked
                className="accent-green-400 w-5 h-5"
              />
            </label>

            <label className="flex items-center justify-between bg-black/30 p-3 rounded-md">
              <span className="flex items-center gap-2">
                <Shield className="text-teal-400" /> Privacy Mode
              </span>
              <input type="checkbox" className="accent-teal-400 w-5 h-5" />
            </label>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Profile;
