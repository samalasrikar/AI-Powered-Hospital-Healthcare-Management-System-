const mongoose = require("mongoose");

const vitalsSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    temperature: {
      type: Number,
      required: true,
    },

    bloodPressure: {
      type: String,
      required: true,
    },

    heartRate: {
      type: Number,
      required: true,
    },

    oxygenLevel: {
      type: Number,
      required: true,
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vitals", vitalsSchema);