const Hospital = require('../models/Hospital');

const createHospital = async (req, res, next) => {
  try {
    const { name, code, address, phone, email } = req.body;

    const hospital = await Hospital.create({
      name,
      code,
      address,
      phone,
      email,
    });

    res.status(201).json({
      success: true,
      message: 'Hospital created successfully',
      data: hospital,
    });
  } catch (error) {
    next(error);
  }
};

const getHospitals = async (req, res, next) => {
  try {
    const hospitals = await Hospital.find();

    res.status(200).json({
      success: true,
      data: hospitals,
    });
  } catch (error) {
    next(error);
  }
};

const getHospitalById = async (req, res, next) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: 'Hospital not found',
      });
    }

    res.status(200).json({
      success: true,
      data: hospital,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createHospital,
  getHospitals,
  getHospitalById,
};