const express = require('express');
const { getExpiryTracking } = require('../controllers/expiryTrackingController');

const router = express.Router();

router.get('/', getExpiryTracking);

module.exports = router;