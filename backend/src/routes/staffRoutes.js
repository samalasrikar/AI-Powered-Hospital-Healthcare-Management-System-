const express = require('express');
const router = express.Router();

const protect = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

const {
  createStaff,
  listStaff,
  getStaff,
  updateStaff,
  disableStaff,
} = require('../controllers/staffController');

router.use(protect, authorizeRoles('HospitalAdmin'));

router.post('/', createStaff);
router.get('/', listStaff);
router.get('/:id', getStaff);
router.put('/:id', updateStaff);
router.patch('/:id/disable', disableStaff);

module.exports = router;