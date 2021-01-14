const express = require('express');
const router = express.Router();

// import controller
const userController = require('../controllers/user_controller');
const awaitHandler = require('../middleware/await_handler');
const auth = require('../middleware/auth');

// all routes 
router.get('/', auth(), awaitHandler(userController.getAllUsers));
router.get('/test', awaitHandler(userController.test));


module.exports = router;