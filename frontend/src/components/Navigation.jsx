import React, { useEffect, useState } from 'react'

const LogIn = ()=>{
    return(
        <a className='btn btn-dark mt-1 rounded-pill' aria-current="false" href="/login">Log In - Sign In</a>
    )
}

const LogOut = ()=>{
    return(
        <a className='btn btn-dark mt-1 rounded-pill' aria-current="false" href="/logout">Log Out</a>
    )
}


const Nav = ()=> {

    const [logged, setLogged] = useState(false)

    useEffect(()=>{
        if(window.localStorage.getItem('loggedNoteAppUser') != null){
            setLogged(true)
        }
    }, [])

        return(
            <div className='d-flex justify-content-between'>
                <ul class="nav nav-fill nav-underline">
                    <li className="nav-item">
                        <a className="nav-link active" href="/">Notes App</a>
                    </li>
                    {
                        logged ? (
                            <>
                                <li class="nav-item mx-3">
                                    <a class="nav-link" href="/notes">Notes</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/profile">Profile</a>
                                </li>
                            </>)
                            : (
                            <>
                                <li class="nav-item mx-3">
                                    <a class="nav-link disabled" aria-disabled="true" href="/notes">Notes</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link disabled" aria-disabled="true" href="/profile">Profile</a>
                                </li>
                            </>)
                    }
                </ul>
                <div>
                    { logged ? <LogOut /> : <LogIn /> }
                </div>
            </div> 
        )
}

export default Nav;