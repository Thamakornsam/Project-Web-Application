const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


//Route Post for create new user to register 
router.post('/register',  userController.createUser);

//Route Post for login user by email and password that were input.
router.post('/login', userController.findUserByEmailAndPassword);


module.exports = router;
