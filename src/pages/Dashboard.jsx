import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
    const { user } = useAuth();
  console.log("Logged in user:", user);
  return (
    <div>
      
      <Sidebar/>
    </div>
  )
}

export default Dashboard
