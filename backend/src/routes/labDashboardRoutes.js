const express = require('express');
const { getLabDashboard } = require('../controllers/labDashboardController');

const router = express.Router();

router.get('/', getLabDashboard);

module.exports = router;