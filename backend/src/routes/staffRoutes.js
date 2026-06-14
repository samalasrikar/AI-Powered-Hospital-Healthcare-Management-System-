const express = require('express');
const router = express.Router();

const protect = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');
<<<<<<< HEAD
=======

>>>>>>> 52d9a3dc537faa5b345062b1c825f9519ce025a0
const {
  createStaff,
  listStaff,
  getStaff,
  updateStaff,
  disableStaff,
} = require('../controllers/staffController');

<<<<<<< HEAD
// All routes protected; only HospitalAdmin (or SuperAdmin) can manage staff
=======
>>>>>>> 52d9a3dc537faa5b345062b1c825f9519ce025a0
router.use(protect, authorizeRoles('HospitalAdmin'));

router.post('/', createStaff);
router.get('/', listStaff);
router.get('/:id', getStaff);
router.put('/:id', updateStaff);
router.patch('/:id/disable', disableStaff);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 52d9a3dc537faa5b345062b1c825f9519ce025a0
