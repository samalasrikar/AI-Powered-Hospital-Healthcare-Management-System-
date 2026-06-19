const express = require('express');
const {
  getMedicines,
  dispenseMedicine,
  getDispensingHistory
} = require('../controllers/medicineDispensingController');

const router = express.Router();

router.get('/', getMedicines);
router.post('/dispense', dispenseMedicine);
router.get('/history', getDispensingHistory);

module.exports = router;