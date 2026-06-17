const User = require('../models/User');
const Hospital = require('../models/Hospital');
const bcrypt = require('bcryptjs');

// POST /api/admins — Create a HospitalAdmin and assign to hospital
const createHospitalAdmin = async (req, res, next) => {
  try {
    const { fullName, email, password, hospitalId } = req.body;

    if (!fullName || !email || !password || !hospitalId) {
      return res.status(400).json({
        success: false,
        message: 'fullName, email, password and hospitalId are required',
      });
    }

    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }

    const admin = await User.create({ fullName, email, password, role: 'HospitalAdmin', hospitalId });

    res.status(201).json({
      success: true,
      message: 'Hospital Admin created successfully',
      data: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role,
        hospitalId: admin.hospitalId,
        hospitalName: hospital.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/admins — List all HospitalAdmins with their hospital name
const listHospitalAdmins = async (req, res, next) => {
  try {
    const { status, hospitalId } = req.query;
    const query = { role: 'HospitalAdmin' };
    if (status)     query.status     = status;
    if (hospitalId) query.hospitalId = hospitalId;

    const admins = await User.find(query)
      .select('-password')
      .populate('hospitalId', 'name code status')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: admins });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/admins/:id/status — Disable or re-enable a HospitalAdmin
const toggleAdminStatus = async (req, res, next) => {
  try {
    const admin = await User.findOne({ _id: req.params.id, role: 'HospitalAdmin' });
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Hospital Admin not found' });
    }

    admin.status = admin.status === 'Active' ? 'Inactive' : 'Active';
    await admin.save();

    res.status(200).json({
      success: true,
      message: `Admin ${admin.status === 'Active' ? 'enabled' : 'disabled'}`,
      data: { id: admin._id, fullName: admin.fullName, status: admin.status },
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/admins/:id/reset-password — Reset a HospitalAdmin's password
const resetAdminPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }

    const admin = await User.findOne({ _id: req.params.id, role: 'HospitalAdmin' }).select('+password');
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Hospital Admin not found' });
    }

    admin.password = newPassword; // pre-save hook will hash it
    await admin.save();

    res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/admins/:id/reassign — Reassign admin to a different hospital
const reassignAdmin = async (req, res, next) => {
  try {
    const { hospitalId } = req.body;
    if (!hospitalId) {
      return res.status(400).json({ success: false, message: 'hospitalId is required' });
    }

    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }

    const admin = await User.findOne({ _id: req.params.id, role: 'HospitalAdmin' });
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Hospital Admin not found' });
    }

    admin.hospitalId = hospitalId;
    await admin.save();

    res.status(200).json({
      success: true,
      message: `Admin reassigned to ${hospital.name}`,
      data: { id: admin._id, fullName: admin.fullName, hospitalId, hospitalName: hospital.name },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createHospitalAdmin,
  listHospitalAdmins,
  toggleAdminStatus,
  resetAdminPassword,
  reassignAdmin,
};