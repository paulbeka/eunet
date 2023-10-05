import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
import EUFlag from "../imgs/europe-flag.webp"


const NavBar = (currentPage) => {
  const barItems = [
    {"title": "Home", "link": "/"},
    {"title": "About", "link": "/about"},
    {"title": "Login", "link": "/login"},
  ]

  return (
    <div className="navbar">
      <img src={EUFlag} alt="EU Flag" className="eu-flag-logo" />
      <div className="navbar-link-items">
        {barItems.map((item, key) => {
          return (<Link to={item.link} style={{"width" : "100%", "height": "100%"}}>
            <div onClick={(e) => currentPage.setCurrentPage(item.title)} className={`navbar-item ${
            currentPage.currentPage === item.title.toLowerCase() ? "navbar-item-clicked" : ""
          }`}>
            
              <span>{item.title}</span>
            </div>
            </Link>)
        })}
      </div>
    </div>
  )
}

export default NavBar