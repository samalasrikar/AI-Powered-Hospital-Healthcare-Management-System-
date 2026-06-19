const express = require('express');
const {
  getPayments,
  createPayment,
  updatePaymentStatus
} = require('../controllers/paymentController');

const router = express.Router();

router.get('/', getPayments);
router.post('/', createPayment);
router.patch('/:id/status', updatePaymentStatus);

module.exports = router;