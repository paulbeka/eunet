import React, { useState } from "react";
import { Outlet } from "react-router-dom"
import NavBar from '../components/NavBar.js'
import './CSS/Base.css'

const Base = () => {

  const [currentPage, setCurrentPage] = useState("Home");
  
  return (
    <div className="base">
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="pageContent">
        <Outlet />
      </div>
    </div>
  )
}

export default Base;