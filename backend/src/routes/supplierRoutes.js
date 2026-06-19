const express = require('express');
const {
  getSuppliers,
  createSupplier
} = require('../controllers/supplierController');

const router = express.Router();

router.get('/', getSuppliers);
router.post('/', createSupplier);

module.exports = router;