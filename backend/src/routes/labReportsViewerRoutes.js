const express = require('express');
const { viewLabReport } = require('../controllers/labReportsViewerController');

const router = express.Router();

router.get('/:reportId', viewLabReport);

module.exports = router;