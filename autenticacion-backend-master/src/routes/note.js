const { Router } = require('express');

const router = Router();

const {getNotes, createNote, getUserNotes, updateNote, deleteNote, getNote} = require('../controllers/note');

router.route('/')
    .get(getNotes)

router.route('/single/:id')
    .get(passport.authenticate('jwt', {session: false}), getNote)
    
router.route('/:id')
    .post(passport.authenticate('jwt', {session: false}), createNote)
    .get(passport.authenticate('jwt', {session: false}), getUserNotes)
    .put(passport.authenticate('jwt', {session: false}), updateNote)
    .delete(passport.authenticate('jwt', {session: false}), deleteNote)

module.exports = router;