const mongoose = require("mongoose");

const availabilityStatuses = [
  "Available",
  "Busy",
  "On Leave",
];

const doctorSchema = new mongoose.Schema(
  {
    doctorId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    specialization: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    qualification: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: Number,
      required: true,
      min: 0,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^[0-9]{10}$/, "Please provide a valid phone number"],
    },

    availabilityStatus: {
      type: String,
      enum: availabilityStatuses,
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);