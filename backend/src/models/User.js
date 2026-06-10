const mongoose = require('mongoose');

const roles = [
  'SuperAdmin',
  'HospitalAdmin',
  'Doctor',
  'Nurse',
  'Receptionist',
  'LabTechnician',
  'Pharmacist',
  'BillingExecutive',
  'Patient',
];

const statuses = ['Active', 'Inactive'];

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      required: true,
      enum: roles,
    },
    status: {
      type: String,
      required: true,
      enum: statuses,
      default: 'Active',
    },
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      required() {
        return this.role !== 'SuperAdmin';
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
