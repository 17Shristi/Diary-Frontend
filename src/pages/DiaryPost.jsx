import { useState, useEffect} from 'react'
import { useParams} from 'react-router-dom'
import {format} from 'date-fns'
import {useAuthContext} from '../hooks/useAuthContext.js'
import styles from '../styles/styles.module.scss';

const DiaryPost = () => {
 
 const { id } = useParams();
 const [post, setPost] = useState(null);
 const { user } = useAuthContext();

 useEffect(() => {
    const fetchPost = async() => {
      
            const response = await fetch(`https://diary-api-3i8q.onrender.com/api/posts/${id}`,{
              headers: {
                'Authorization': `Bearer ${user.token}`
              }
            });
            if(response.ok)
            {
              const result = await response.json();
                setPost(result);
            }
    }

   if(user) fetchPost();
 },[user,id,setPost]); 

 if(!post) return null;
  return (
    <div className={styles.diaryPost}>
        <h2>{ post.title} </h2>
        <div>{format(new Date(post.date),'MMMM d, y')}</div>
        <p>{post.content}</p>
    </div>
  )
}

export default DiaryPost