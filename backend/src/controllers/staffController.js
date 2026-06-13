const User = require('../models/User');

const forbiddenRoles = ['SuperAdmin', 'Patient'];

const createStaff = async (req, res, next) => {
  try {
    const { fullName, email, password, role, hospitalId: bodyHospitalId } = req.body;

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'fullName, email, password and role are required',
      });
    }

    if (forbiddenRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role for staff',
      });
    }

    const existing = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Email already in use',
      });
    }

    const hospitalId =
      req.user.role === 'SuperAdmin'
        ? bodyHospitalId
        : req.user.hospitalId;

    const user = await User.create({
      fullName,
      email,
      password,
      role,
      hospitalId,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(201).json({
      success: true,
      message: 'Staff created',
      data: userResponse,
    });
  } catch (error) {
    next(error);
  }
};

const listStaff = async (req, res, next) => {
  try {
    const query = {
      hospitalId: req.user.hospitalId,
      role: { $nin: ['Patient', 'HospitalAdmin', 'SuperAdmin'] },
    };

    const staff = await User.find(query).select('-password');

    return res.status(200).json({
      success: true,
      data: staff,
    });
  } catch (error) {
    next(error);
  }
};

const getStaff = async (req, res, next) => {
  try {
    const staff = await User.findById(req.params.id).select('-password');

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: staff,
    });
  } catch (error) {
    next(error);
  }
};

const updateStaff = async (req, res, next) => {
  try {
    const staff = await User.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff not found',
      });
    }

    const { fullName, email, role, status } = req.body;

    if (fullName) staff.fullName = fullName;
    if (email) staff.email = email;
    if (role) staff.role = role;
    if (status) staff.status = status;

    await staff.save();

    return res.status(200).json({
      success: true,
      message: 'Staff updated',
      data: staff,
    });
  } catch (error) {
    next(error);
  }
};

const disableStaff = async (req, res, next) => {
  try {
    const staff = await User.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff not found',
      });
    }

    staff.status = 'Inactive';

    await staff.save();

    return res.status(200).json({
      success: true,
      message: 'Staff disabled',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStaff,
  listStaff,
  getStaff,
  updateStaff,
  disableStaff,
};