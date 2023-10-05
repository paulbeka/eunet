import React, { useState, useEffect } from "react"
import "./CSS/Home.css"
import { Link } from 'react-router-dom'
import axiosInstance  from "../util/axiosInstance";


const Home = () => {

  const [posts, setPosts] = useState([])

  const getAllPosts = () => {
    axiosInstance.get("posts")
    .then((res) => {
      if(res.status === 200) {
        setPosts(res.data);
      } else {
        console.log(`There has been an error. Status code: ${res.status}`)
      }
    })
  }

  useEffect(() => {
    getAllPosts();
  }, [])

  const renderPostCard = (post) => {
    return (
      <div className="post-card">        
        <h3>{post.title}</h3>
        <p>{post.description}</p>
      </div>
    )
  }

  return (
    <div className="homepage">
      <div className="homepage-title">
        <h1>Latest Posts</h1>
      </div>
      <hr style={{"border-top": "1px solid black"}}/>
      <div className="post-display">
        {posts.map((post, key) => {
          return (<Link to={post.link}>
            {renderPostCard(post)}
          </Link>)
        })}
      </div>
    </div>
  )
}

export default Home