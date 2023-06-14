import { useForm } from 'react-hook-form';
import { usePostContext } from '../hooks/usePostContext.js';
import { useAuthContext } from '../hooks/useAuthContext.js';
import styles from '../styles/styles.module.scss';

const PostForm = () => {
   
  const { register, handleSubmit, setError, reset, formState: {errors}} = useForm();
  const { dispatch } = usePostContext();
  const { user } = useAuthContext();

  const onSubmit = async data => {
    const  post  = {
        date: data.date,
        title: data.title,
        content: data.content,
    }

    try {
        const response  = await fetch('https://diary-api-3i8q.onrender.com/api/posts',{
            method: 'POST',
            body: JSON.stringify(post),
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            }
        })

        const body  = await response.text();
        const newPost  = JSON.parse(body);

        if(!response.ok) setError('something went wrong', {type: 400});
        
        if(response.ok) {
            reset({ title: '', date: '', content: ''}); 
            dispatch({type: 'CREATE_POST',payload: newPost});
            console.log('New Post Created', newPost);       
        }

    } catch (error) {
        console.log(error);
    }
  }
  return (
    <>
        <form className={styles.postForm} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h3>Write your thoughts here...</h3>
          </div>
          <input type = "text"
            {...register("title", {required: 'required field'})}
            placeholder = "Title " />
          
          <p>{errors.title?.message}</p>

          <input type = "date"
            {...register("date", {required: 'required field'})}
            />
          
          <p>{errors.date?.message}</p>

          <textarea rows= "15" className={styles.content}
             {...register("content", {required : 'required field'})}
             placeholder='Dear Diary...'
          />
          <p>{errors.content?.message}</p>

          <button type ="submit" value= "submit" >
               Post
          </button>

        </form>
    </>
  )
}

export default PostForm