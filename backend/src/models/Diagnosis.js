const mongoose = require("mongoose");

const diagnosisSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    symptoms: {
      type: String,
      required: true,
      trim: true,
    },

    diagnosis: {
      type: String,
      required: true,
      trim: true,
    },

    notes: {
      type: String,
      trim: true,
    },

    treatmentPlan: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Diagnosis", diagnosisSchema);