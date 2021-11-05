import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'

const Notes = (props)=>{
    
    const [token, setToken] = useState(undefined)
    const [user, setUser] = useState({})
    const [notes, setNotes] = useState([])

    const fetchDataUser = async ()=>{

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        await axios.get('http://localhost:4000/api/user/profile/', config)
            .then(res=>{
                const data = res.data
                setUser(data.user)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    const fetchDataNote = async ()=>{
        await axios.get('http://localhost:4000/api/note/' + user._id)
            .then(res=>{
                const data = res.data
                setNotes(data)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    const extractToken = ()=>{
        try {
            const userLogged = window.localStorage.getItem('loggedNoteAppUser')
            const userData = JSON.parse(userLogged)
            return userData.token
        } catch (error) {
            console.log(error)
        }
         
    }

    
    useEffect(()=>{

        if(typeof token==='undefined'){
            const token = extractToken()
            setToken(token)
        }else if(Object.keys(user).length===0 && token.length!==0){
            fetchDataUser()
        }else{
            fetchDataNote()
        }

    }, [token, user])

    const deleteNote = async (noteID, authorID)=>{
        await axios.delete('http://localhost:4000/api/note/' + noteID)
        await axios.post('http://localhost:4000/api/user/update/?idUser='+authorID+'&idNote='+noteID)
        fetchDataNote()  
    }
    
    console.log(token)
    console.log(user)
    console.log(notes)
    if(window.localStorage.getItem('loggedNoteAppUser') == null){
        return(
            <Redirect to='/login'/>
        )
    }else{
            return(
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-4"><FormNotes id={user._id} /></div>
                        <div className="col">
                            <div className="row row-cols-3">
                                {notes.length == 0 ? <p>No hay notas</p> : notes.map(note=>(
                                    <div className="col-md-4 p-2" key={note._id}>
                                    <div className="card">
                                        <div className="card-header d-flex justify-content-between">
                                            <div>
                                                <h5>{note.title}</h5>
                                            </div>
                                            <div>
                                                <Link to={"/edit/" + note._id} className="btn btn-secondary">
                                                    Update
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <p>
                                                {note.content}
                                            </p>
                                            <p>
                                                Author: {note.author}
                                            </p>
                                            <hr/>
                                            <p>
                                                ID Author: {note.idAuthor}
                                            </p>
                                        </div>
                                        <div className="card-footer">
                                            <button onClick={()=>{deleteNote(note._id, note.idAuthor)}} className="btn btn-danger">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } 
   }


const FormNotes = ({id})=>{

    const [datos, setDatos] = useState({
        title: "",
        content: ""
    })

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const enviarNota = async (e)=>{
        e.preventDefault()
        await axios.post('http://localhost:4000/api/note/' + id,{
            title: datos.title,
            content: datos.content
        })
            .then(res=>{
                const data = res.data
                console.log(data)
                window.location.href = '/notes';
            })
            .catch(error=>{
                console.log(error)
            })
    }

    return(
        <div>
            <form onSubmit={enviarNota}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" onChange={handleInputChange} name="title" placeholder="My first note..."/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea className="form-control" rows="3" onChange={handleInputChange} name="content" placeholder="Some text..."></textarea>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Notes;