const { Router } = require('express');
const passport = require('passport');

const router = Router();

const {getUsers, createUser, deleteUser, loginUser, logoutUser, authUser, getUser, updateUserNoteList} = require("../controllers/user")

router.route('/')
    .get(getUsers)
    .post(createUser)

router.route('/single/:id')
    .get(getUser)

router.route('/update/')
    .post(updateUserNoteList)

router.route('/:id')
    .delete(deleteUser)

router.route('/login')
    .post(loginUser)

router.route('/logout')
    .get(logoutUser)

router.route('/profile')
    .get(passport.authenticate('jwt', {session: false}), authUser)      // Esto es como poner app.get('/profile', ()=>{...}, ()=>{...}, ()=>{...} )
                                                                                            // se va a ir ejecutanto un middleware despues del otro

module.exports = router;