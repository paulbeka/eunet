import React, { useState, useEffect } from 'react'
import './CSS/Post.css'
import fetchClient from '../util/axiosInstance'
import { useParams } from 'react-router-dom';
import { useNavigate} from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs"
import { EditorState, convertFromRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'


const PostPage = () => {
  
  const [postData, setPostData] = useState(null);
  const [title, setTitle] = useState(null);
  const { titleId } = useParams();

  const navigate = useNavigate();

  const getPostData = () => {
    fetchClient().get(`get-post/${titleId}`)
    .then((res) => {
      if(res.status === 200) {
        setTitle(res.data.title);
        setPostData(convertFromRaw(JSON.parse(res.data.content)));
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
          <BsArrowLeft size={40} style={{"cursor": "pointer", "position": "fixed", "left": "20%"}} onClick={() => navigate(-1)} />
          {title === null ? <></> : <h1 style={{"text-align": "center"}}>{title}</h1>}
          <div dangerouslySetInnerHTML={{ __html: stateToHTML(postData) }} />
        </>
      : 
        <>Post loading...</>
      }
    </div>
  )
}

export default PostPage