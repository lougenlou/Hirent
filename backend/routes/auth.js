const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/authController');

// ⬇ ADD THESE
const { registerValidation, loginValidation } = require('../middleware/validators/userValidators');
const validate = require('../middleware/validationHandler');

// REGISTER route with validation
router.post('/register', registerValidation, validate, registerUser);

// LOGIN route with validation
router.post('/login', loginValidation, validate, loginUser);

module.exports = router;
