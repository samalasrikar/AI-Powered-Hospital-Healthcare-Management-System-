const User = require('../models/User');
const Hospital = require('../models/Hospital');

const createHospitalAdmin = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      password,
      hospitalId,
    } = req.body;

    if (!fullName || !email || !password || !hospitalId) {
      return res.status(400).json({
        success: false,
        message: 'fullName, email, password and hospitalId are required',
      });
    }

    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: 'Hospital not found',
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists',
      });
    }

    const admin = await User.create({
      fullName,
      email,
      password,
      role: 'HospitalAdmin',
      hospitalId,
    });

    res.status(201).json({
      success: true,
      message: 'Hospital Admin created successfully',
      data: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role,
        hospitalId: admin.hospitalId,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createHospitalAdmin,
};