import React from "react";
import { format } from 'date-fns'
import { usePostContext } from '../hooks/usePostContext.js';
import { useAuthContext } from "../hooks/useAuthContext.js";
import { Link } from "react-router-dom";
import styles from "../styles/styles.module.scss";

const PostHead = ({ post }) => {

  const {dispatch } = usePostContext();
  const {user} = useAuthContext();

  const handleClick = async () => {
    const response = await fetch(
      `https://diary-api-3i8q.onrender.com/api/posts/${post._id}`,
      {
        method: "DELETE",
        headers : {
          'Authorization': `Bearer ${user.token}`,
      }
      }
    );

    const body = await response.text();
    const result = JSON.parse(body);
    if (response.ok) {
      dispatch({type:'DELETE_POST',payload: result});
      console.log("post deleted", result);
    }
  };

  return (
    <li>
      <span className={styles.postHeadHeader}>
        <h4>
          <Link to={`/api/posts/${post._id}`} >
          {post.title}</Link>
        </h4>
          <span className="material-symbols-outlined " onClick={handleClick}>
            delete
          </span>
        </span>
     
      <div>{format(new Date(post.date), 'MMMM d, y')}</div>
      <p>{post.content.substring(0, 150) + " ..."}</p>
    </li>
  );
};

export default PostHead;
