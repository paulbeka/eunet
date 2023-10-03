import React from "react";
import { Outlet } from "react-router-dom"
import NavBar from '../components/NavBar.js'

const Base = () => {
  
  return (
    <div className="base">
      <NavBar />
      <div className="pageContent">
        <Outlet />
      </div>
    </div>
  )
}

export default Base;