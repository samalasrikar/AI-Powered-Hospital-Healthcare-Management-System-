const express = require('express');
const uploadRoutes = require('./uploadRoutes');
const authRoutes = require('./authRoutes');
const emrSearchRoutes = require('./emrSearchRoutes');
const patientHistoryRoutes = require('./patientHistoryRoutes');

const router = express.Router();

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
router.use('/patient-history', patientHistoryRoutes);

module.exports = router;