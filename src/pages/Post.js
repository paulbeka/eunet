import React, { useState, useEffect } from 'react'
import './CSS/Post.css'
import axiosInstance from '../util/axiosInstance'
import { useParams } from 'react-router-dom';


const PostPage = () => {
  
  const [postData, setPostData] = useState(null)
  const { titleId } = useParams();

  const getPostData = () => {
    axiosInstance.get(`get-post/${titleId}`)
    .then((res) => {
      if(res.status === 200) {
        setPostData(res.data);
      } else {
        console.log("There has been an unexpected error. Code: " + res.status);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getPostData()
  }, [titleId]);

  return (
    <div className="postpage">
      {postData !== null ? 
        postData.content.map((item, key) => {
          if(item.type === "title") {
            return (
            <div style={{"text-align": "center"}}>
              <h1>{item.content}</h1>
            </div>)
          } else if(item.type === "subtitle") {
            return <h3>{item.content}</h3>
          } else if(item.type === "text") {
            return <p>{item.content}</p>
          }
        }) 
      : 
        <>Post loading...</>
      }
    </div>
  )
}

export default PostPage