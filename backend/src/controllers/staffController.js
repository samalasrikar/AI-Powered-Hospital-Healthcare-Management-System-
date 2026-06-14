const User = require('../models/User');

// Roles that can be created/managed by Hospital Admins
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
    const { role, status, page = 1, limit = 50 } = req.query;

    const query = {};

    if (req.user.role !== 'SuperAdmin') {
      query.hospitalId = req.user.hospitalId;
    }

    query.role = { $ne: 'Patient' };

    if (role && role !== 'Patient') {
      query.role = role;
    }

    if (status) {
      query.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const items = await User.find(query)
      .skip(skip)
      .limit(Number(limit))
      .select('-password');

    const total = await User.countDocuments(query);

    return res.status(200).json({
      success: true,
      data: {
        items,
        total,
        page: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getStaff = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Staff not found',
      });
    }

    if (
      req.user.role !== 'SuperAdmin' &&
      String(user.hospitalId) !== String(req.user.hospitalId)
    ) {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateStaff = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { fullName, email, role, status } = req.body;

    const user = await User.findById(id).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Staff not found',
      });
    }

    if (
      req.user.role !== 'SuperAdmin' &&
      String(user.hospitalId) !== String(req.user.hospitalId)
    ) {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    if (role && forbiddenRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role',
      });
    }

    if (email && email.toLowerCase() !== user.email) {
      const exists = await User.findOne({
        email: email.toLowerCase(),
      });

      if (exists && String(exists._id) !== String(user._id)) {
        return res.status(409).json({
          success: false,
          message: 'Email already in use',
        });
      }

      user.email = email.toLowerCase();
    }

    if (fullName) user.fullName = fullName;
    if (role) user.role = role;
    if (status) user.status = status;

    await user.save();

    const out = user.toObject();
    delete out.password;

    return res.status(200).json({
      success: true,
      message: 'Staff updated',
      data: out,
    });
  } catch (error) {
    next(error);
  }
};

const disableStaff = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Staff not found',
      });
    }

    if (
      req.user.role !== 'SuperAdmin' &&
      String(user.hospitalId) !== String(req.user.hospitalId)
    ) {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    user.status = 'Inactive';

    await user.save();

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