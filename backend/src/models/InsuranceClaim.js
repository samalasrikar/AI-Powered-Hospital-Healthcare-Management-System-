const mongoose = require("mongoose");

const insuranceClaimSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
    },

    insuranceProvider: {
      type: String,
      required: true,
      trim: true,
    },

    claimAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: [
        "Submitted",
        "UnderReview",
        "Approved",
        "Rejected",
        "Settled",
      ],
      default: "Submitted",
    },

    remarks: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "InsuranceClaim",
  insuranceClaimSchema
);