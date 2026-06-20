const express = require('express');

const uploadRoutes = require('./uploadRoutes');
const authRoutes = require('./authRoutes');
const staffRoutes = require('./staffRoutes');
const hospitalRoutes = require('./hospitalRoutes');
const emrSearchRoutes = require('./emrSearchRoutes');
const adminRoutes = require('./adminRoutes');
const labReportUploadRoutes = require('./labReportUploadRoutes');
const patientHistoryRoutes = require('./patientHistoryRoutes');
const emrViewerRoutes = require('./emrViewerRoutes');
const labReportsViewerRoutes = require('./labReportsViewerRoutes');
const labDashboardRoutes = require('./labDashboardRoutes');
const labWorkflowRoutes = require('./labWorkflowRoutes');
const expiryTrackingRoutes = require('./expiryTrackingRoutes');
const aiRoutes = require('./aiRoutes');
const symptomAnalyzerRoutes = require('./symptomAnalyzerRoutes');
const prescriptionBotRoutes = require('./prescriptionBotRoutes');
const emrSummarizerRoutes = require('./emrSummarizerRoutes');
const operationsAnalyticsRoutes = require('./operationsAnalyticsRoutes');
const appointmentAssistantRoutes = require("./appointmentAssistantRoutes");
const revenueAnalyticsRoutes = require('./revenueAnalyticsRoutes');
const patientRoutes = require('./patientRoutes');
const dischargeRoutes = require('./dischargeRoutes');
const medicineDispensingRoutes = require('./medicineDispensingRoutes');
const supplierRoutes = require('./supplierRoutes');
const paymentRoutes = require('./paymentRoutes');
const router = express.Router();
const inventoryAlertRoutes = require('./inventoryAlertRoutes');
const billingRoutes = require("./billingRoutes");
const insuranceClaimRoutes = require("./insuranceClaimRoutes");

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running',
  });
});

// Register feature routes
router.use("/insurance-claims", insuranceClaimRoutes);
router.use("/billing", billingRoutes);
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
router.use('/ai', aiRoutes);
router.use('/prescription-bot', prescriptionBotRoutes);
router.use('/emr-summarizer', emrSummarizerRoutes);
router.use('/symptom-analyzer', symptomAnalyzerRoutes);
router.use("/appointment-assistant",appointmentAssistantRoutes);
router.use('/revenue-analytics',revenueAnalyticsRoutes);
router.use('/operations-analytics', operationsAnalyticsRoutes);
router.use('/patients', patientRoutes);
router.use('/discharges', dischargeRoutes);
router.use('/medicine-dispensing', medicineDispensingRoutes);
router.use('/suppliers', supplierRoutes);
router.use('/payments', paymentRoutes);
router.use('/inventory-alerts', inventoryAlertRoutes);
module.exports = router;


