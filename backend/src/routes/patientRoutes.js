const express = require("express");
const router = express.Router();

const {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");

// Create Patient
router.post("/", createPatient);

// Get All Patients
router.get("/", getPatients);

// Get Single Patient
router.get("/:id", getPatient);

// Update Patient
router.put("/:id", updatePatient);

// Delete Patient
router.delete("/:id", deletePatient);

module.exports = router;