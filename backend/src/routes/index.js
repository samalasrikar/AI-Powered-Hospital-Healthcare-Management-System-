const express = require('express');

const router = express.Router();

const authRoutes = require('./authRoutes');

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running',
  });
});

router.use('/auth', authRoutes);

module.exports = router;