import  {useEffect } from 'react'
import { Redirect } from 'react-router-dom';

export const Logout = ()=>{

    useEffect(()=>{
        window.localStorage.removeItem('loggedNoteAppUser')
    }, [])

    return window.location.href = '/'
}