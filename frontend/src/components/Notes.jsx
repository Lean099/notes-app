import { useState, useEffect } from 'react'
import { redirect, Link } from "react-router";
import axios from 'axios'

const Notes = (props)=>{
    
    const [token, setToken] = useState('')
    const [user, setUser] = useState({})
    const [notes, setNotes] = useState([])
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

     const fetchDataNote = async ()=>{
        await axios.get(`${import.meta.env.VITE_API_URL}/api/note/${user._id}`, config)
            .then(res=>{
                setNotes(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
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

            async function fetchData(){
                await axios.get(`${import.meta.env.VITE_API_URL}/api/user/single`, config)
                    .then(res=>{
                        setUser(res.data.data)
                        setNotes(res.data.data.notes)
                    })
            }

            fetchData()
        }

    }, [])

    const deleteNote = async (noteID)=>{
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/note/${noteID}`, config)
        fetchDataNote()
    }
    
    if(window.localStorage.getItem('loggedNoteAppUser') == null){
        return redirect("/login")
    }else{
            return(
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-4"><FormNotes id={user._id} config={config} actualizarCambios={fetchDataNote}/></div>
                        <div className="col">
                            <div className="row row-cols-3">
                                {notes.length == 0 ? 
                                <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: "200px" }}>
                                    <p className="text-center lead">There are no notes</p>
                                </div> 
                            : 
                                notes.map(note=>(
                                    <div className="col-md-4 p-2" key={note._id}>
                                    <div className="card">
                                        <div className="card-header">
                                            <div>
                                                <h5>{note.title}</h5>
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
                                        <div className="card-footer d-flex flex-wrap justify-content-between">
                                            <button onClick={()=>{deleteNote(note._id, note.idAuthor)}} className="btn btn-sm btn-danger">
                                                Delete
                                            </button>
                                            <div>
                                                <Link to={"/edit/" + note._id} className="btn btn-sm btn-secondary">
                                                    Update
                                                </Link>
                                            </div>
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


const FormNotes = ({id, config, actualizarCambios})=>{

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
        await axios.post(`${import.meta.env.VITE_API_URL}/api/note/`,{
            title: datos.title,
            content: datos.content,
            idUser: id  
        }, config)
            .then(res=>{
                //window.location.href = '/notes';
                setDatos({ title: "", content: "" });
                actualizarCambios()
            })
            .catch(error=>{
                console.log(error)
            })
    }

    return(
        <div>
            <form onSubmit={enviarNota}>
                <div className='text-center mb-3 fs-2 lead'>
                    Create Note
                </div>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" onChange={handleInputChange} name="title" value={datos.title} placeholder="My first note..."/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea className="form-control" rows="3" onChange={handleInputChange} name="content" value={datos.content} placeholder="Some text..."></textarea>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Notes;