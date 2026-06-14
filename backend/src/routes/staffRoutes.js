const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const auditLogger = require('../middlewares/auditLogger');
const authorizeRoles = require('../middlewares/roleMiddleware');
const {
  createStaff,
  listStaff,
  getStaff,
  updateStaff,
  disableStaff,
} = require('../controllers/staffController');

// All routes protected; only HospitalAdmin (or SuperAdmin) can manage staff
router.use(protect, authorizeRoles('HospitalAdmin'));

router.post('/',auditLogger('CREATE', 'Staff'),createStaff);
router.get('/', listStaff);
router.get('/:id', getStaff);
router.put('/:id',auditLogger('UPDATE', 'Staff'), updateStaff);
router.patch('/:id/disable',auditLogger('UPDATE', 'Staff'), disableStaff);

module.exports = router;
