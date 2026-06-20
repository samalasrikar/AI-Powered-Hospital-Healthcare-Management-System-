const express = require('express');
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require('../middlewares/roleMiddleware');
const authRateLimiter = require('../middlewares/authRateLimiter');
const validate = require('../middlewares/validate');

const {
  registerValidation,
  loginValidation,
} = require('../utils/authValidator');
const {
  register,
  login,
  refreshAccessToken,
} = require('../controllers/authController');

router.post(
  '/register',
  registerValidation,
  validate,
  register
);

router.post(
  '/login',
  authRateLimiter,
  loginValidation,
  validate,
  login
);


router.post(
  '/refresh-token',
  refreshAccessToken
);

router.get('/protected', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Protected route accessed successfully',
    user: req.user
  });
});

module.exports = router;