// server/routes/studentRoutes.js

const express = require('express');
const router = express.Router();
const { finalizeDeposit } = require('../controllers/depositController');
const { protect } = require('../middleware/authMiddleware');

// Any route in this file will first go through the 'protect' middleware.
// If the token is valid, it will proceed to 'finalizeDeposit'.
// If not, the middleware will send an error response.
router.post('/finalize-deposit', protect, finalizeDeposit);

module.exports = router;