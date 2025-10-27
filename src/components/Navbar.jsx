import React from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white rounded-lg">
      <h1 className="text-lg font-semibold">
        👋 Welcome, {user?.displayName || "Guest"}
      </h1>
      {user && (
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm font-medium"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
