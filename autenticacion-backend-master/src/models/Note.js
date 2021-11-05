const { Schema, model } = require('mongoose');

const NoteSchema = new Schema({
    title: String,
    content: String,
    author: String,
    idAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
},{timestamps: true})

module.exports = model("Note", NoteSchema);