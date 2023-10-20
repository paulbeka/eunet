import React from "react";
import fetchClient from "../../util/axiosInstance";


const DeletePost = (e, post, getAllPosts) => {
  e.preventDefault()
  fetchClient().delete(`get-post/${post.location.split(".")[0]}`)
  .then((res) => {
    if(res.status === 200) {
      getAllPosts()
    } else {
      console.log("An unexpected error occured. Code: " + res.status)
    }
  })
  .catch((err) => {
    console.error(err.message);
  })
}

export default DeletePost