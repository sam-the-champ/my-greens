import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'
import Header from '../components/Header'

const Dashboard = () => {
    const { user } = useAuth();
  console.log("Logged in user:", user);
  return (
    <div>
      <Sidebar/>
      <main className="flex-1 bg-gray-900 p-4 sm:p-6 min-h-screen overflow-y-auto rounded-xl">
        <Header/>
      </main>
    </div>
  )
}

export default Dashboard
