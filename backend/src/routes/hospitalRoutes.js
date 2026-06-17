const express = require('express');
const router = express.Router();

const protect = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

const {
  createHospital,
  getHospitals,
  getHospitalById,
  updateHospital,
  toggleHospitalStatus,
  getGlobalAnalytics,
} = require('../controllers/hospitalController');

// All hospital routes — SuperAdmin only
router.use(protect, authorizeRoles('SuperAdmin'));

router.get('/analytics/global', getGlobalAnalytics);   // global stats
router.get('/', getHospitals);                          // list all
router.post('/', createHospital);                       // create
router.get('/:id', getHospitalById);                   // get one
router.patch('/:id', updateHospital);                  // update details
router.patch('/:id/status', toggleHospitalStatus);     // activate/deactivate

module.exports = router;