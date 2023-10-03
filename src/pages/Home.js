import React, { useState } from "react"
import "./CSS/Home.css"
import { Link } from 'react-router-dom'


const Home = () => {

  const [posts, setPosts] = useState([
    {"title": "EU Budget Announcement", "description": "This is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a test", "link":""},
    {"title": "EU SOmething something Announcement", "description": "This is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a test", "link":""},
    {"title": "EU lebekgjro greg ergre greg ", "description": "This is a testThis is a testThis is a testThis is a testThis is a test", "link":""},
    {"title": "Ukraine is winning on all fronts", "description": "This is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a test", "link":""},
    {"title": "EU Budget AnnouncementThis is a test", "description": "This is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a test", "link":""},

  ])

  const renderPostCard = (post) => {
    return (
      <div className="post-card">
        <Link to={post.link}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
        </Link>
      </div>
    )
  }

  return (
    <div className="homepage">
      <div className="homepage-title">
        <h1>Latest Posts</h1>
      </div>
      <div className="post-display">
        {posts.map((post, key) => {
          return renderPostCard(post)
        })}
      </div>
    </div>
  )
}

export default Home