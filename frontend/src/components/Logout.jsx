import  {useEffect } from 'react'

export const Logout = ()=>{

    useEffect(()=>{
        window.localStorage.removeItem('loggedNoteAppUser')
    }, [])

    return window.location.href = '/'
}