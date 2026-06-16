const express = require('express');
const { analyzeSymptoms } = require('../controllers/symptomAnalyzerController');

const router = express.Router();

router.post('/', analyzeSymptoms);

module.exports = router;