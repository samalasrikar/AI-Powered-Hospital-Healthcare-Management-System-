const mongoose = require("mongoose");

const documentTypes = [
  "Prescription",
  "Lab Report",
  "X-Ray",
  "MRI",
  "CT Scan",
];

const medicalRecordSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    documentType: {
      type: String,
      enum: documentTypes,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
      trim: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    uploadDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);