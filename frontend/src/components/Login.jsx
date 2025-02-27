import React, { useState } from 'react'
import axios from 'axios'

export const Login = ()=>{
    const [datos, setDatos] = useState({
        emailLogin:'',
        passLogin:'',
        emailSign:'',
        user:'',
        passSign:''
    })
    const [response, setResponse] = useState({
        message: '',
        token: '',
        loggedIn: null
    })

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const onEnviarDatos = async (e)=>{
        e.preventDefault()
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/user/`, {
            username: datos.user,
            email: datos.emailSign,
            password: datos.passSign
         })
        setDatos({
            user: '',
            emailSign: '',
            passSign: ''
        })
            setTimeout(()=>{alert('Usuario Registrado correctamente')}, 500)
        } catch (error) {
            alert('Ah ocurrido un error')
        }
    }

    const enviarLogin = async (e)=>{
        e.preventDefault()
            await axios.post(`${import.meta.env.VITE_API_URL}/api/user/login/`, {
                email: datos.emailLogin,
                password: datos.passLogin
            })
                .then(res=>{
                    const data = res.data
                    setResponse({ 
                        message: data.message,
                        token: data.token,
                        loggedIn: data.loggedIn
                    })
                    window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(data))
                    window.location.href = '/profile';
                })
                .catch(error=>{
                    console.log(error)
                })
    }

    return(
        <div className='container-fluid mt-5'>
            <div className="row justify-content-md-center">
                <div className="col col-lg-4 m-5">
                    <form onSubmit={enviarLogin}>
                        <div className='text-center mb-3 fs-2 lead'>
                            Log In
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" placeholder="" name="emailLogin" value={datos.emailLogin} onChange={handleInputChange} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" name="passLogin" value={datos.passLogin} onChange={handleInputChange} required/>
                        </div>
                        <div className="mb-3">
                            <button type="submit" class="btn btn-primary">Log In</button>
                        </div>
                    </form>     
                </div>
                <div className="col col-lg-4 m-5">
                    <form onSubmit={onEnviarDatos}>
                        <div className='text-center mb-3 fs-2 lead'>
                            Sign Up
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" placeholder="" name="user" value={datos.user} onChange={handleInputChange} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" placeholder="" name="emailSign" value={datos.emailSign} onChange={handleInputChange} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" name="passSign" value={datos.passSign} onChange={handleInputChange} required/>
                        </div>
                        <div className="mb-3">
                            <button type="submit" class="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}