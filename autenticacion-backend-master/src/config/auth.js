const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


/* Esta se usa para la ruta /login, el token se genera en el controlador user en loginUser,
luego ese token lo guardamos en el frontend y lo usamos luego para acceder a otras rutas */
module.export = passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},async (email, password, done)=>{
    try {
        const user = await User.findOne({email: email})
        user.validatePassword(password).then(isMatch => {
            if(isMatch){ 
                done(null, user) } 
            else { 
                done(null, false, {message: 'La contraseña no es valida'})
            }
        })
    } catch (e) {
        done(e)
    }
}))


// Este es para proteger las rutas privadas se coloca antes de ejecutar el controlador
module.export = passport.use('jwt', new JwtStrategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, async (token, done)=>{
        try {
            const user = await User.findOne({_id: token.id})
            if(user){
                return done(null, user)
            }else{
                return done(null, false, { message: "You don't have access" });
            }
        } catch (error) {
            return done(err, false);
        }
}))

// Esto creo que ni se usa probar luego
/*passport.serializeUser((user, done)=>{
    done(null, user._id)
})

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        done(null, user)
    })
})*/


