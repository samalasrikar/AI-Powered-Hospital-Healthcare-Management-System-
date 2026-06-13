const express = require('express');

const uploadRoutes = require('./uploadRoutes');
const authRoutes = require('./authRoutes');
const staffRoutes = require('./staffRoutes');
const hospitalRoutes = require('./hospitalRoutes');
const emrSearchRoutes = require('./emrSearchRoutes');
const adminRoutes = require('./adminRoutes');


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
router.use('/staff', staffRoutes);
router.use('/emr-search', emrSearchRoutes);
router.use('/hospitals', hospitalRoutes);
router.use('/admins', adminRoutes);

module.exports = router;
