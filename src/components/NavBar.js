import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'


const NavBar = () => {
  const barItems = [
    {"title": "Home", "link": "/"},
    {"title": "About", "link": "/about"},
    {"title": "Login", "link": "/login"},
  ]

  return (
    <div className="navbar">
      {barItems.map((item, key) => {
        return (<div className="navbar-item">
          <Link to={item.link}>
            <span>{item.title}</span>
          </Link></div>)
      })}
    </div>
  )
}

export default NavBar