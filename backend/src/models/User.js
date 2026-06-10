const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
      match: [/^(?!.*\.\.)[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Please provide a valid email address'],
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
      ref: 'Hospital',
      required() {
        return this.role !== 'SuperAdmin';
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) {
    return;
  }

  if (/^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(this.password)) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', userSchema);
