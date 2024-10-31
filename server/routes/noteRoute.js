const express = require('express');
const router = express.Router();

//importing the controller file.....
const noteController = require('../controllers/noteController');

//Defining notes...........

router.get('/', noteController.getNotes);

router.post('/', noteController.createNote);

router.put('/:id',  noteController.editNote);

router.delete('/:id',  noteController.deleteNote);

module.exports = router;