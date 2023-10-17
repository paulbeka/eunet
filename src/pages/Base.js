import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom"
import NavBar from '../components/NavBar.js'
import './CSS/Base.css'
import { useLocation } from 'react-router-dom'

const Base = () => {

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    setCurrentPage(path)
  }, [location.pathname]);

  const [currentPage, setCurrentPage] = useState("/home");
  
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