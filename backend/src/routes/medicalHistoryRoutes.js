const express = require("express");

const router = express.Router();

const {
  createMedicalHistory,
  getMedicalHistory,
} = require("../controllers/medicalHistoryController");

// Create Medical History
router.post("/", createMedicalHistory);

// Get Medical History by Patient ID
router.get("/:patientId", getMedicalHistory);

module.exports = router;