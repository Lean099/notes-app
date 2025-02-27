const passport = require('passport');
const jwt = require('jsonwebtoken');
const controllers = {};


const User = require('../models/User');
const Note = require('../models/Note')
require('../config/auth')

controllers.getUsers = async (req, res)=>{
    const users = await User.find();
    res.json(users);
}

// El id del usuario lo obtengo gracias a passport que me lo guarda en el req luego de hacer la autorizacion
controllers.getUser = async (req, res)=>{
    const userOne = await User.findOne({_id: req.user.id}).populate('notes')
    if (!userOne) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json({
        message: "Success!!",
        data: userOne
    })
}

controllers.createUser = async (req, res, next)=>{
    const {username, email, password} = req.body;
    const user = await User.create({username: username, email: email, password: password});
    user.save();
    res.json('user created');
}

controllers.loginUser = async (req, res, next)=> {
    passport.authenticate('login', (err, usuario)=>{
        // JWT sing token here
        const {_id} = usuario;
        const token = jwt.sign({id: _id}, process.env.JWT_SECRET)
        if(err){ next(err); }
        if(!usuario){ 
            res.status(404).json({
                message: 'Incorrect email or password',
                loggedIn: false
            })
         }
        res.json({
            message: 'User successfully logged in',
            token,
            loggedIn: true
        })
    })(req, res, next)
}

controllers.deleteUser = async (req, res)=>{
    await Note.deleteMany({idAuthor: req.params.id})
    await User.deleteOne({_id: req.params.id});
    res.json('User removed');
}

// Borra simplemente una nota de la lista o su referencia dentro del array notes, pero no elimina la nota, es solo para actualizar
controllers.updateUserNoteList = async (req, res)=>{
    await User.findOneAndUpdate({_id: req.body.idUser}, {$pull : {notes: req.body.idNote}})
    res.json({
        message: 'Updated note list...'
    })
}


module.exports = controllers;