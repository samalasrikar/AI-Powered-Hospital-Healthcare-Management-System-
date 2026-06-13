const express = require('express');
const uploadRoutes = require('./uploadRoutes');
const authRoutes = require('./authRoutes');
const labReportsViewerRoutes = require('./labReportsViewerRoutes');
const router = express.Router();


const emrSearchRoutes = require('./emrSearchRoutes');

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running',
  });
});

// Register feature routes
router.use('/upload', uploadRoutes);
router.use('/auth', authRoutes);
router.use('/emr-search', emrSearchRoutes);
router.use('/lab-reports', labReportsViewerRoutes);
module.exports = router;
