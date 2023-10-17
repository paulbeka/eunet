import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
import EUFlag from "../imgs/europe-flag.webp"
import { useAuth } from '../util/AuthContext'
import { AuthContext } from '../util/AuthContext';


const NavBar = (currentPage) => {
  
  const auth = useAuth()
  const [barItems, setBarItems] = useState([])
  const authContext = useContext(AuthContext) ;

  useEffect(() => {
    if(localStorage.getItem("accessToken") !== null) {
        setBarItems([
        {"title": "Home", "link": "/"},
        {"title": "Post", "link": "/create_post"},
        {"title": "About", "link": "/about"},
        {"title": "Logout", "link": "/login", "action": authContext.logout}
      ])
    } else {
      setBarItems([
        {"title": "Home", "link": "/"},
        {"title": "About", "link": "/about"},
        {"title": "Login", "link": "/login"},
        {"title": "Register", "link": "/register"}
      ])
    }
  }, [auth.isLoggedIn])

  const clickedNavbarItem = (item) => {
    console.log(item.link)
    if(item.action === undefined) {
      if(item.link === "/") {
        currentPage.setCurrentPage("/")
      } else {
        currentPage.setCurrentPage(item.link.toLowerCase());
      }
    } else {
      item.action()
      window.location.reload()
    }
  }

  return (
    <div className="navbar">
      <img src={EUFlag} alt="EU Flag" className="eu-flag-logo" />
      <div className="navbar-link-items">
        {barItems.map((item, key) => {
          return (<Link to={item.link} style={{"width" : "100%", "height": "100%"}}>
            <div onClick={(e) => clickedNavbarItem(item)} className={`navbar-item ${
            currentPage.currentPage === item.link.toLowerCase() ? "navbar-item-clicked" : ""
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