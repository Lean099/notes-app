const { Router } = require('express');
const passport = require('passport');

const router = Router();

const {getUsers, createUser, deleteUser, loginUser, logoutUser, authUser, getUser, updateUserNoteList} = require("../controllers/user")

// Poner esto en las rutas privadas passport.authenticate('jwt', {session: false}) antes de que ejecute el controlador

router.route('/')
    .get(passport.authenticate('jwt', {session: false}), getUsers)
    .post(createUser)

router.route('/single/:id')
    .get(passport.authenticate('jwt', {session: false}), getUser)

router.route('/update/')
    .post(passport.authenticate('jwt', {session: false}), updateUserNoteList)

router.route('/:id')
    .delete(passport.authenticate('jwt', {session: false}), deleteUser)

router.route('/login')
    .post(loginUser)

module.exports = router;