import React, { useState, useEffect } from 'react'
import './CSS/Post.css'
import axiosInstance from '../util/axiosInstance'
import { useParams } from 'react-router-dom';
import { useNavigate} from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs"


const PostPage = () => {
  
  const [postData, setPostData] = useState(null)
  const { titleId } = useParams();

  const navigate = useNavigate();

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
        <>
          {postData.content.map((item, key) => {
            if(item.type === "title") {
              return (
              <div style={{"text-align": "center"}}>
                <BsArrowLeft size={40} style={{"cursor": "pointer", "position": "fixed", "left": "20%"}} onClick={() => navigate(-1)} />
                <h1>{item.content}</h1>
                <br />
              </div>)
            } else if(item.type === "subtitle") {
              return <h3>{item.content}</h3>
            } else if(item.type === "text") {
              return <p>{item.content}</p>
            }
          })}
        </>
      : 
        <>Post loading...</>
      }
    </div>
  )
}

export default PostPage