const notesControllers = {};

const Note = require('../models/Note');
const User = require('../models/User');

notesControllers.getNotes = async (req, res)=>{
    const notes = await Note.find();
    res.json(notes);
}

notesControllers.getNote = async (req, res)=>{
    const note = await Note.findOne({_id: req.params.id});
    res.json(note);
}

notesControllers.createNote = async (req, res)=>{
    const {title, content, idUser} = req.body;
    const user = await User.findById(idUser)
    const newNote = new Note({title: title, content: content, author: user.username, idAuthor: user._id});
    await newNote.save()
    user.notes = user.notes.concat(newNote._id)
    await user.save()
    res.json({
        message: "Note Created",
        note: newNote
    })
}

notesControllers.getUserNotes = async (req, res)=>{
    const notes = await Note.find({idAuthor: req.params.id})
    res.json(notes)
}

/* No hace falta pasar title y content los dos a la vez podria ser { "content": "asd..." } y solo actualizaria
el contenido de la nota */
notesControllers.updateNote = async (req, res)=>{
    const {title, content} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {
        title: title,
        content: content
    });
    res.json({
        message: "Note Updated Successfully"
    })
}

notesControllers.deleteNote = async (req, res)=>{
    const noteAndUser = await Note.findOne({_id: req.params.id}).populate('idAuthor', {
        notes: 1,
        _id: 1,
    })
    await Note.findOneAndDelete({_id: req.params.id})
    await User.findOneAndUpdate({_id: noteAndUser.idAuthor._id}, {$pull: {notes: req.params.id}})
    res.json({
        message: "Note delete successfully",
    })
}

module.exports = notesControllers;