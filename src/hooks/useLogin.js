import { useState } from "react";
import { useAuthContext } from './useAuthContext.js';

export const useLogin= () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            
            const response = await fetch('https://diary-api-3i8q.onrender.com/api/user/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password})
            });

            const result = await response.json();

            if(!response.ok)
            {
               
                setLoading(false);
                setError(result.error);
            }
            if(response.ok)
            {
                localStorage.setItem('user', JSON.stringify(result));
                dispatch({type: 'LOGIN', payload: result});
                setLoading(false);
            }


        } catch (error) {
            setLoading(false);
            console.log(error);

        }
    }

    return { login, error, loading };
}