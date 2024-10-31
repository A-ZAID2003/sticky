//Importing the (note) model file
const Note = require('../models/note');

//Getting all notes...

exports.getNotes = async(req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

// Create a new note.........

exports.createNote = async(req, res) => {
    const newNote = new Note(req.body);
    try {
      const savedNote = await newNote.save();
      res.status(201).json(savedNote);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};

//Edit an existing note.............

exports.editNote = async(req, res) => {
  const updatedNote = await Note.findByIdAndUpdate(req.params.id);
  try{
    const updatedAndSavedNote = await updatedNote.save();
    res.status(201).json(updatedAndSavedNote);
  } catch (err) {
    res.status(500).json({message: err.message });
  }
}

// Delete a note..........

exports.deleteNote = async(req, res) => {
    try {
      await Note.findByIdAndDelete(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};


