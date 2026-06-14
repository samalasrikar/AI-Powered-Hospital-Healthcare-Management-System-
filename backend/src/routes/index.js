const express = require('express');

const uploadRoutes = require('./uploadRoutes');
const authRoutes = require('./authRoutes');
const staffRoutes = require('./staffRoutes');
<<<<<<< HEAD

const router = express.Router();

=======
const hospitalRoutes = require('./hospitalRoutes');
>>>>>>> 52d9a3dc537faa5b345062b1c825f9519ce025a0
const emrSearchRoutes = require('./emrSearchRoutes');
const adminRoutes = require('./adminRoutes');

const labReportUploadRoutes = require('./labReportUploadRoutes');
const emrSearchRoutes = require('./emrSearchRoutes');
const patientHistoryRoutes = require('./patientHistoryRoutes');
const emrViewerRoutes = require('./emrViewerRoutes');
const labReportsViewerRoutes = require('./labReportsViewerRoutes');
const labDashboardRoutes = require('./labDashboardRoutes');
const labWorkflowRoutes = require('./labWorkflowRoutes');
const expiryTrackingRoutes = require('./expiryTrackingRoutes');
const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running',
  });
});

// Register feature routes

router.use('/upload', uploadRoutes);
router.use('/auth', authRoutes);
router.use('/staff', staffRoutes);
router.use('/emr-search', emrSearchRoutes);
router.use('/hospitals', hospitalRoutes);
router.use('/admins', adminRoutes);
router.use('/lab-report-upload', labReportUploadRoutes);
router.use('/patient-history', patientHistoryRoutes);
router.use('/emr-viewer', emrViewerRoutes);
router.use('/lab-reports', labReportsViewerRoutes);
router.use('/lab-dashboard', labDashboardRoutes);
router.use('/lab-workflow', labWorkflowRoutes);
router.use('/expiry-tracking', expiryTrackingRoutes);

module.exports = router;
