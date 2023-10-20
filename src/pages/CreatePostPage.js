import React, { useState } from 'react';
import './CSS/CreatePostPage.css';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js'

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import fetchClient from '../util/axiosInstance';


const CreatePostPage = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [error, setError] = useState(null);

  const postPost = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;

    if(editorState === EditorState.createEmpty()) { 
      setError("Please add some content to your post.")
      return;
    }

    const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

    fetchClient().post("/postPost", {"title": title, "description": description, "postContent": content})
    .then((res) => {
      if(res.status === 200) {
        window.location.pathname = "/post/" + title.replaceAll(" ", "_").toLowerCase();
      } else {
        setError("There was an error with the post.");
      }
    })
    .catch((err) => {
      setError(err.message)
    })
  }

  return (
    <div className="postpage">
      <div className="create-post-title">
        <h1>Create Post</h1>
      </div>
      <hr style={{ borderBottom: '1px solid black', width: '60%' }} />
      <form onSubmit={postPost}>
        <span>Title:</span><input type="text" name="title" required />
        <span>Description:</span><input type="text" name="description" required />
        <div className="editor-container">
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
          />
        </div>
        {error ? <p style={{"color": "red"}}>{error}</p> : <></>}
        <button type="submit" className="post-button">Post Article</button>
      </form>
    </div>
  )
}

export default CreatePostPage;
