const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


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

module.export = passport.use('jwt', new JwtStrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('secret_token'),
    //jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token')
}, async (token, done)=>{
    console.log('holeeeee')
    console.log(JSON.stringify(token));
        await User.findOne({_id: token.id}, (err, user)=>{
            console.log(JSON.stringify(user))
            if(err){
                return done(null, err)
            }
            if(user){
                return done(null, user) // iba user._id, este user se guarda en el req (request)
            }else{
                return done(null, false, {message: "You don't have access"})
            }
        })
        
}))

passport.serializeUser((user, done)=>{
    done(null, user._id)
})

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        done(null, user)
    })
})


