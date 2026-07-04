const MedicalHistory = require("../models/MedicalHistory");

// Create Medical History
exports.createMedicalHistory = async (req, res) => {
  try {
    const medicalHistory = await MedicalHistory.create(req.body);

    res.status(201).json({
      success: true,
      data: medicalHistory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Medical History
exports.getMedicalHistory = async (req, res) => {
  try {
    const medicalHistory = await MedicalHistory.findOne({
      patient: req.params.patientId,
    }).populate("patient");

    if (!medicalHistory) {
      return res.status(404).json({
        success: false,
        message: "Medical history not found",
      });
    }

    res.status(200).json({
      success: true,
      data: medicalHistory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};