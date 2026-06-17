const rateLimit = require('express-rate-limit');

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: 'Too many login attempts. Try again after 15 minutes.',
  },
});

module.exports = authRateLimiter;