// server/routes/adminRoutes.js

// const express = require('express');
// const router = express.Router();
// const { generateInitialQRCode } = require('../controllers/containerController');
const express = require('express');
const router = express.Router();
const { generateInitialQRCode } = require('../controllers/containerController');
const { collectBaggage } = require('../controllers/depositController'); // <-- IMPORT
const { protect } = require('../middleware/authMiddleware');

// We will add a middleware here later to protect this route
// router.post('/generate-qr', generateInitialQRCode);
router.post('/generate-qr', protect, generateInitialQRCode);
router.post('/collect-baggage', protect, collectBaggage);
module.exports = router;