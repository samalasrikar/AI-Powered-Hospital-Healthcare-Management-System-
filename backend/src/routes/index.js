const express = require('express');

const router = express.Router();

const authRoutes = require('./authRoutes');
const emrSearchRoutes = require('./emrSearchRoutes');

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running',
  });
});

router.use('/auth', authRoutes);
router.use('/emr-search', emrSearchRoutes);

module.exports = router;