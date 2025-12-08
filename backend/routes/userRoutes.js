const express = require('express');
const userController = require('../controllers/userController.js');
const { registerValidation, validateUser } = require('../validators/userValidators');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/users', registerValidation, validateUser, userController.createUser);
router.get('/users', auth.protect, userController.getAllUsers);

module.exports = router;
