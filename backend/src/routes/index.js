const express = require('express');
const uploadRoutes = require('./uploadRoutes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running',
  });
});

router.use('/upload', uploadRoutes);

module.exports = router;