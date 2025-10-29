import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoutes";

import EcoMarket from "./pages/EcoMarket";
import Profile from "./pages/Profile";
import Blog from "./pages/Blog";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<SignUp />} />
             {/* Protected routes */}
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            }
          />
          <Route path="/EcoMarket" element={<ProtectedRoute><EcoMarket/></ProtectedRoute>}/>
          <Route path="/Profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route path="/Blog" element={<ProtectedRoute><Blog/></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
