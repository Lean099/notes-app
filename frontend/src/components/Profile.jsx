import { useState, useEffect } from 'react'
import { redirect } from "react-router";
import axios from 'axios'

const Profile = (props)=>{
    const [user, setUser] = useState({})
    const [token, setToken] = useState("")
    const [loggedIn, setLoggedIn] = useState(null)

    useEffect(()=>{
        
        const userLogged = window.localStorage.getItem('loggedNoteAppUser')
        if(userLogged){
            const userData = JSON.parse(userLogged)
            setToken(userData.token)
            setLoggedIn(userData.loggedIn)
            const config = {
                headers: { Authorization: `Bearer ${userData.token}` }
            }

            async function fetchData(){
                await axios.get(`${import.meta.env.VITE_API_URL}/api/user/single`, config)
                    .then(res=>{
                        setUser(res.data.data)
                    })
            }

            fetchData()
        }
    }, [])

       
        if(window.localStorage.getItem('loggedNoteAppUser') == null){
            return redirect("/login")
        }else{
            return(
                <div className="container">
                        <div className="row text-center p-4">
                            <h2>Perfil - Datos del usuario</h2>
                        </div>
                        <div className="row text-center p-4">
                            <p className="text-center text-break">Token del usuario: {token}</p>
                            <p className="text-center">Username: {user.username}</p>
                            <p className="text-center">Email: {user.email}</p>
                            <p className="text-center">ID: {user._id}</p>
                        {
                            loggedIn==null ? <p>Logeado: </p> : <p>Logeado: <span className="badge rounded-pill bg-success">{loggedIn.toString()}</span></p>
                        }
                        </div>
                </div>
            )
        }
    }

export default Profile;