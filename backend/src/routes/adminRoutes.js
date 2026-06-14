const express = require('express');
const router = express.Router();

const protect = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

const {
  createHospitalAdmin,
} = require('../controllers/hospitalAdminController');

router.post(
  '/',
  protect,
  authorizeRoles('SuperAdmin'),
  createHospitalAdmin
);

module.exports = router;