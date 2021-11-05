const passport = require('passport');
const jwt = require('jsonwebtoken');
const controllers = {};


const User = require('../models/User');
require('../config/auth')

controllers.getUsers = async (req, res)=>{
    const users = await User.find();
    res.json(users);
}

controllers.getUser = async (req, res)=>{
    const userOne = await User.findOne({_id: req.params.id}).populate('notes')
    res.json({
        message: "Success!!",
        data: userOne
    })
}

controllers.createUser = async (req, res, next)=>{
    const {username, email, password} = req.body;
    const user = await User.create({username: username, email: email, password: password});
    user.save((err)=>{
        if (err) next(err);
        req.logIn(user, {session: false}, (err)=>{
            next(err);
        })
    });
    
    res.json('user created');
}

controllers.loginUser = async (req, res, next)=> {
    passport.authenticate('login', (err, usuario)=>{
        // JWT sing token here
        const {_id} = usuario;
        const token = jwt.sign({id: _id}, 'top_secret')
        if(err){ next(err); }
        if(!usuario){ res.status(404).json({message: 'Email o contraseña incorrecta'}) }
        req.logIn(usuario, {session: false}, (err)=>{
            if(err) {next(err)}
            res.json({
                message: 'Session Started',
                token,
                loggedIn: req.isAuthenticated()
            })
        })
        
    })(req, res, next)
}

controllers.logoutUser = (req, res)=>{
    req.logout()
    res.json('The session has ended')
}

controllers.deleteUser = async (req, res)=>{
    await User.findByIdAndRemove(req.params.id);
    res.json('User removed');
}

controllers.updateUserNoteList = async (req, res)=>{
    await User.findOneAndUpdate({_id: req.query.idUser}, {$pull : {notes: req.query.idNote}})
    const user = await User.findOne({_id: req.query.idUser})
    res.json({
        message: 'Updated note list...'
    })
}

controllers.authUser = async (req, res, next)=> {
    res.json({
        message: 'hola',
        user: req.user,
        loggedIn: req.isAuthenticated()
    })
}


module.exports = controllers;