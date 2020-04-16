const express = require('express');
const router = express.Router();
const counterController = require('../controllers/counterController');

// Get all counter
router.get('/', counterController.getCounter);

// Update counter
router.put('/', counterController.updateCounter);

module.exports = router;
