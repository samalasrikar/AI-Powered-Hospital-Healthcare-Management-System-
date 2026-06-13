const express = require('express');
const router = express.Router();
const protect = require("../middlewares/authMiddleware");

const {
  register,
  login,
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

router.get('/protected', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Protected route accessed successfully',
    user: req.user
  });
});

module.exports = router;