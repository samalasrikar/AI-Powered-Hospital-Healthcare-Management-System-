const { body } = require('express-validator');

exports.registerValidation = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 2 }),

  body('email')
    .isEmail()
    .withMessage('Valid email required')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
];

exports.loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Valid email required'),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];