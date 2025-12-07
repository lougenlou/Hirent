const express = require('express');
const userController = require('../controllers/userController.js');
const { validateUser } = require('../validators/userValidator.js');

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.post('/users', validateUser, userController.createUser);

module.exports = router;
