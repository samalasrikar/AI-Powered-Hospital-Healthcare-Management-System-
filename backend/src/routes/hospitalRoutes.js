const express = require('express');
const router = express.Router();

const protect = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

const {
  createHospital,
  getHospitals,
  getHospitalById,
} = require('../controllers/hospitalController');

router.use(protect, authorizeRoles('SuperAdmin'));

router.post('/', createHospital);
router.get('/', getHospitals);
router.get('/:id', getHospitalById);

module.exports = router;