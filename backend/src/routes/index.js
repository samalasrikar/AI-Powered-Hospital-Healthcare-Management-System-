const express = require('express');
const uploadRoutes = require('./uploadRoutes');
const authRoutes = require('./authRoutes');

const labReportUploadRoutes = require('./labReportUploadRoutes');
const emrSearchRoutes = require('./emrSearchRoutes');
const patientHistoryRoutes = require('./patientHistoryRoutes');
const emrViewerRoutes = require('./emrViewerRoutes');
const labReportsViewerRoutes = require('./labReportsViewerRoutes');
const labDashboardRoutes = require('./labDashboardRoutes');
const labWorkflowRoutes = require('./labWorkflowRoutes');
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
router.use('/emr-search', emrSearchRoutes);
router.use('/lab-report-upload', labReportUploadRoutes);
router.use('/patient-history', patientHistoryRoutes);
router.use('/emr-viewer', emrViewerRoutes);
router.use('/lab-reports', labReportsViewerRoutes);
router.use('/lab-dashboard', labDashboardRoutes);
router.use('/lab-workflow', labWorkflowRoutes);

module.exports = router;
