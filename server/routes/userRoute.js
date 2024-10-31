const express = require('express');
const router = express.Router();

//importing the controller file.....
const userController = require('../controllers/userController');

//Defining the routes........
router.post('/register', userController.register);

router.post ('/login', userController.login);

module.exports = router;

