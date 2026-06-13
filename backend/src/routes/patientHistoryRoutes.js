const express = require('express');
const { getPatientHistory } = require('../controllers/patientHistoryController');

const router = express.Router();

router.get('/:patientId', getPatientHistory);

module.exports = router;