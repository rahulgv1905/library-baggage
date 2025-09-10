// server/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Map the POST request to /api/users/register to the registerUser function
router.post('/register', registerUser);

// Map the POST request to /api/users/login to the loginUser function
router.post('/login', loginUser);

module.exports = router;