const { Router } = require('express');
const passport = require('passport');

const router = Router();

const {getUsers, createUser, deleteUser, loginUser, logoutUser, authUser, getUser, updateUserNoteList} = require("../controllers/user")

// Poner esto en las rutas privadas passport.authenticate('jwt', {session: false}) antes de que ejecute el controlador
/* Aclaro cuando passport hace la autenticacion y usa el metodo done, en el req del controlador guarda el usuario,
el mensaje de que no se autentico el usuario o el error en caso de que no salio algo bien */

router.route('/')
    //.get(passport.authenticate('jwt', {session: false}), getUsers)
    .post(createUser)

router.route('/single')
    .get(passport.authenticate('jwt', {session: false}), getUser)

router.route('/updateUserNoteList')
    .post(passport.authenticate('jwt', {session: false}), updateUserNoteList)

router.route('/:id')
    .delete(passport.authenticate('jwt', {session: false}), deleteUser)

router.route('/login')
    .post(loginUser)

module.exports = router;