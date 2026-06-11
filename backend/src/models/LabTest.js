const mongoose = require("mongoose");

const statuses = [
  "Requested",
  "Sample Collected",
  "Testing",
  "Completed",
];

const labTestSchema = new mongoose.Schema(
  {
    testId: {
      type: String,
      required: true,
      unique: true,
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    testType: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: statuses,
      default: "Requested",
    },

    reportUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LabTest", labTestSchema);