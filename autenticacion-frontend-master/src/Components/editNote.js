import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'

export const EditNote = ()=>{

    const [datos, setDatos] = useState({
        title: "",
        content: ""
    })

    const {id} = useParams()

    useEffect(()=>{
        async function getDataNote(){
            await axios.get(`${process.env.REACT_APP_API_URL}/api/note/single/${id}`)
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
    }, [])

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const enviarNota = async (e)=>{
        e.preventDefault()
        await axios.put(`${process.env.REACT_APP_API_URL}/api/note/${id}`,{
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
        <div className="col-md-6 mx-auto mt-4">
            <form onSubmit={enviarNota}>
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