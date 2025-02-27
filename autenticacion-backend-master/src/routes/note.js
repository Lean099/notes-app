const { Router } = require('express');
const passport = require('passport');

const router = Router();

const {getNotes, createNote, getUserNotes, updateNote, deleteNote, getNote} = require('../controllers/note');

router.route('/')
    //.get(passport.authenticate('jwt', {session: false}), getNotes)
    .post(passport.authenticate('jwt', {session: false}), createNote)

router.route('/single/:id')
    .get(passport.authenticate('jwt', {session: false}), getNote)
    
router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}), getUserNotes)
    .put(passport.authenticate('jwt', {session: false}), updateNote)
    .delete(passport.authenticate('jwt', {session: false}), deleteNote)

module.exports = router;