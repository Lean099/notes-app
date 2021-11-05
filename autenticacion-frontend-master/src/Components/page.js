import React, { Component } from 'react'

export default class Page extends Component{
    render(){
        return(
            <div className="container">
                <div className="row text-center p-4">
                    <h1 className="">Bienvenido a Social Web</h1>
                </div>
                <div className="row text-center">
                    <h3 className="pb-2">Registrate o Logeate para poder acceder al Home y a tu Perfil</h3>
                    <p className="">Ve a la seccion Log In - Sign In</p>
                </div>
                
            </div>
        )
    }
}