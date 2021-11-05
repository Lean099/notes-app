const { Router } = require('express');

const router = Router();

const {getNotes, createNote, getUserNotes, updateNote, deleteNote, getNote} = require('../controllers/note');

router.route('/')
    .get(getNotes)

router.route('/single/:id')
    .get(getNote)
    
router.route('/:id')
    .post(createNote)
    .get(getUserNotes)
    .put(updateNote)
    .delete(deleteNote)

module.exports = router;