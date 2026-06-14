const mongoose = require("mongoose");

const medicalHistorySchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      unique: true
    },

    allergies: {
      type: [String],
      default: []
    },

    previousDiseases: {
      type: [String],
      default: []
    },

    surgeries: {
      type: [String],
      default: []
    },

    currentMedications: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "MedicalHistory",
  medicalHistorySchema
);