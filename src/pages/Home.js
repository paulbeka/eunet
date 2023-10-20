import React, { useState, useEffect } from "react"
import "./CSS/Home.css"
import { Link } from 'react-router-dom'
import fetchClient  from "../util/axiosInstance";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DeletePost from "../components/postTools/DeletePost";


const Home = () => {

  const [posts, setPosts] = useState(null)

  const getAllPosts = () => {
    fetchClient().get("posts")
    .then((res) => {
      if(res.status === 200) {
        setPosts(res.data);
      } else {
        console.log(`There has been an error. Status code: ${res.status}`)
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getAllPosts();
  }, [])

  const renderPostCard = (post) => {
    return (
      <div className="post-card">
        <Link to={"/post/" + post.location.split(".")[0]}>
          <div className="post-card-text">
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </div>    
        </Link>
        <div className="post-card-trash-can">
          <Link onClick={(e) => DeletePost(e, post, getAllPosts)}>
            <FontAwesomeIcon icon={faTrash} size="80px" />
          </Link>
        </div>
      </div>
    )
  } 

  return ( 
    <div className="homepage">
      <div className="homepage-title">
        <h1>Latest Posts</h1>
      </div>
      <hr style={{"border-bottom": "1px solid black", "width" : "60%"}}/>
      <br />
      {posts !== null ? 
        <div className="post-display">
          {posts.map((post, key) => {
            return (
              renderPostCard(post)
            )
          })}
        </div>
        : 
        <div style={{"text-align": "center", "font-size": "16px", "min-width": "100%"}}>
          <br />
          <h3>Loading data...</h3>
        </div>
        }
      
    </div>
  )
}

export default Home