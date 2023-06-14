import React, { useEffect } from 'react'
import { usePostContext} from '../hooks/usePostContext.js';
import { useAuthContext } from '../hooks/useAuthContext.js';
import PostHead from '../components/PostHead';
import PostForm from '../components/PostForm';
import styles from '../styles/styles.module.scss'

const Home = () => {
  
 const {posts, dispatch } = usePostContext();
 const { user } = useAuthContext();
  useEffect( () => {
    const fetchPosts = async() => {
     
            const response = await fetch('https://diary-api-3i8q.onrender.com/api/posts',{
              headers: {
                'Authorization': `Bearer ${user.token}`
              }
            });
            if(response.ok)
            {
              const results = await response.json();
                dispatch({type: 'SET_POSTS',payload: results});
            }
    }

    if(user) fetchPosts();
  },[user,dispatch]);
  return (
    <>
        {/* Posts  */}
        <div>
           <h2 style={{marginLeft:"2.5rem"}}> NoteBook</h2>
           <ul className={styles.postList}>
              {posts && posts.map( (post) => 
                <PostHead key = {post._id} post = {post} />
              )}
           </ul>
        </div>

        {/* Form  */}
        <div> 
          <PostForm/>
        </div>
    </>
  )
}

export default Home