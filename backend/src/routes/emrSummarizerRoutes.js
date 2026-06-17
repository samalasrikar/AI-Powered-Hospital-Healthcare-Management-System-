const express = require('express');
const {
  summarizeMedicalRecord,
} = require('../controllers/emrSummarizerController');

const router = express.Router();

router.post('/', summarizeMedicalRecord);

module.exports = router;