import React, { useEffect, useState } from 'react'

const LogIn = ()=>{
    return(
        <li className="nav-item">
            <a className="nav-link" aria-current="false" href="/login">Log In - Sign In</a>
        </li>
    )
}

const LogOut = ()=>{
    return(
        <li className="nav-item">
            <a className="nav-link" aria-current="false" href="/logout">Log Out</a>
        </li>
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
            <div className="card text-center">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Notes App</a>
                        </li>
                        {
                            logged ? <LogOut /> : <LogIn />
                        }
                        <li className="nav-item">
                            <a className="nav-link" href="/notes">Notas</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/profile" tabIndex="-1" aria-disabled="false">Perfil</a>
                        </li>
                    </ul>
                </div>
            </div>
        ) 
}

export default Nav;