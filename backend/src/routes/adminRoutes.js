const express = require('express');
const router = express.Router();

const protect = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

const {
  createHospitalAdmin,
  listHospitalAdmins,
  toggleAdminStatus,
  resetAdminPassword,
  reassignAdmin,
} = require('../controllers/hospitalAdminController');

// All admin management routes — SuperAdmin only
router.use(protect, authorizeRoles('SuperAdmin'));

router.get('/', listHospitalAdmins);                        // list all hospital admins
router.post('/', createHospitalAdmin);                      // create admin + assign hospital
router.patch('/:id/status', toggleAdminStatus);             // enable / disable
router.patch('/:id/reset-password', resetAdminPassword);    // reset password
router.patch('/:id/reassign', reassignAdmin);               // move to another hospital

module.exports = router;