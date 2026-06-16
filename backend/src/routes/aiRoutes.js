const express = require('express');
const router = express.Router();

const { checkAIHealth } = require('../controllers/aiController');

router.get('/health', checkAIHealth);

module.exports = router;