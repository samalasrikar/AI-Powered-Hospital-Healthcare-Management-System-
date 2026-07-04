const express = require('express');
const { uploadLabReport } = require('../controllers/labReportUploadController');

const router = express.Router();

router.post('/', uploadLabReport);

module.exports = router;