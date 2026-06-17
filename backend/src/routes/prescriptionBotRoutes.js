const express = require('express');
const {
  explainPrescription,
} = require('../controllers/prescriptionBotController');

const router = express.Router();

router.post('/', explainPrescription);

module.exports = router;