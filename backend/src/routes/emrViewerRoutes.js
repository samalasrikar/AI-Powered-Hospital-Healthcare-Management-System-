const express = require('express');
const { viewMedicalRecord } = require('../controllers/emrViewerController');

const router = express.Router();

router.get('/:recordId', viewMedicalRecord);

module.exports = router;