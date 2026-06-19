const express = require('express');
const {
  dischargePatient,
  getDischarges
} = require('../controllers/dischargeController');

const router = express.Router();

router.post('/', dischargePatient);
router.get('/', getDischarges);

module.exports = router;