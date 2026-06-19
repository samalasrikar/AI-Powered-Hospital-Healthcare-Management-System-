const express = require('express');
const { getAlerts } = require('../controllers/inventoryAlertController');

const router = express.Router();

router.get('/', getAlerts);

module.exports = router;