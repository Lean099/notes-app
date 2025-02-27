import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'

export const EditNote = ()=>{

    const [datos, setDatos] = useState({
        title: "",
        content: ""
    })
    const [token, setToken] = useState('')
    const [loggedIn, setLoggedIn] = useState(null)
    const {id} = useParams()
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    useEffect(()=>{

        const userLogged = window.localStorage.getItem('loggedNoteAppUser')
        if(userLogged){
            const userData = JSON.parse(userLogged)
            setToken(userData.token)
            setLoggedIn(userData.loggedIn)
            const config = {
                headers: { Authorization: `Bearer ${userData.token}` }
            }

            async function getDataNote(){
                await axios.get(`${import.meta.env.VITE_API_URL}/api/note/single/${id}`, config)
                    .then(res=>{
                        setDatos({
                            title: res.data.title,
                            content: res.data.content
                        })
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            }
            if(datos.title=="" && datos.content==""){
                getDataNote()
            }
        }

    }, [])

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const enviarNota = async (e)=>{
        e.preventDefault()
        await axios.put(`${import.meta.env.VITE_API_URL}/api/note/${id}`,{
            title: datos.title,
            content: datos.content
        }, config)
            .then(res=>{
                window.location.href = '/notes';
            })
            .catch(error=>{
                console.log(error)
            })
    }

    return(
        <div className="col-md-6 mx-auto mt-5">
            <form onSubmit={enviarNota}>
            <div className='text-center mb-3 fs-2 lead'>
                    Update Note
                </div>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" onChange={handleInputChange} value={datos.title} name="title" placeholder="My first note..."/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea className="form-control" rows="3" onChange={handleInputChange} value={datos.content} name="content" placeholder="Some text..."></textarea>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}