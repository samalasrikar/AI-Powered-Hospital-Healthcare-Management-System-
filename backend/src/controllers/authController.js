const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const logActivity = require('../utils/activityLogger');

const register = async (req, res, next) => {
  try {
    const { fullName, email, password, hospitalId } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must contain uppercase, lowercase, number and special character',
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
      });
    }

    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      password,
      role: 'Patient',
      hospitalId,
    });

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        hospitalId: user.hospitalId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    const refreshToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: '7d',
      }
    );

    await logActivity({
      userId: user._id,
      action: "LOGIN",
      module: "Auth",
      ipAddress: req.ip,
      metadata: {
        email: user.email,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          status: user.status,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
