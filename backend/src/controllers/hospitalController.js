const Hospital = require('../models/Hospital');
const User = require('../models/User');
const Patient = require('../models/Patient');

// GET /api/hospitals — list all hospitals with per-hospital staff/admin counts
const getHospitals = async (req, res, next) => {
  try {
    const hospitals = await Hospital.find().sort({ createdAt: -1 });

    // Attach admin count per hospital
    const hospitalIds = hospitals.map((h) => h._id);

    const adminCounts = await User.aggregate([
      { $match: { hospitalId: { $in: hospitalIds }, role: 'HospitalAdmin' } },
      { $group: { _id: '$hospitalId', count: { $sum: 1 } } },
    ]);

    const staffCounts = await User.aggregate([
      { $match: { hospitalId: { $in: hospitalIds }, role: { $ne: 'Patient' } } },
      { $group: { _id: '$hospitalId', count: { $sum: 1 } } },
    ]);

    const adminMap = Object.fromEntries(adminCounts.map((a) => [String(a._id), a.count]));
    const staffMap = Object.fromEntries(staffCounts.map((s) => [String(s._id), s.count]));

    const enriched = hospitals.map((h) => ({
      ...h.toObject(),
      adminCount: adminMap[String(h._id)] || 0,
      staffCount: staffMap[String(h._id)] || 0,
    }));

    res.status(200).json({ success: true, data: enriched });
  } catch (error) {
    next(error);
  }
};

// POST /api/hospitals — create hospital
const createHospital = async (req, res, next) => {
  try {
    const { name, code, address, phone, email } = req.body;

    if (!name || !code || !address || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: 'name, code, address, phone and email are required',
      });
    }

    const existing = await Hospital.findOne({ code: code.toUpperCase() });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Hospital code already exists' });
    }

    const hospital = await Hospital.create({ name, code, address, phone, email });
    res.status(201).json({ success: true, message: 'Hospital created', data: hospital });
  } catch (error) {
    next(error);
  }
};

// GET /api/hospitals/:id
const getHospitalById = async (req, res, next) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }
    res.status(200).json({ success: true, data: hospital });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/hospitals/:id — update hospital details
const updateHospital = async (req, res, next) => {
  try {
    const { name, address, phone, email } = req.body;
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }

    if (name)    hospital.name    = name;
    if (address) hospital.address = address;
    if (phone)   hospital.phone   = phone;
    if (email)   hospital.email   = email.toLowerCase();

    await hospital.save();
    res.status(200).json({ success: true, message: 'Hospital updated', data: hospital });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/hospitals/:id/status — activate or deactivate
const toggleHospitalStatus = async (req, res, next) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }

    hospital.status = hospital.status === 'Active' ? 'Inactive' : 'Active';
    await hospital.save();

    res.status(200).json({
      success: true,
      message: `Hospital ${hospital.status === 'Active' ? 'activated' : 'deactivated'}`,
      data: hospital,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/hospitals/analytics/global — SuperAdmin global stats
const getGlobalAnalytics = async (req, res, next) => {
  try {
    const [
      totalHospitals,
      activeHospitals,
      totalPatients,
      totalDoctors,
      totalStaff,
      staffByRole,
      hospitalStaffBreakdown,
    ] = await Promise.all([
      Hospital.countDocuments(),
      Hospital.countDocuments({ status: 'Active' }),
      Patient.countDocuments(),
      User.countDocuments({ role: 'Doctor' }),
      User.countDocuments({ role: { $ne: 'Patient' } }),
      // Staff breakdown by role
      User.aggregate([
        { $match: { role: { $nin: ['Patient', 'SuperAdmin'] } } },
        { $group: { _id: '$role', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      // Per-hospital staff count for ranking
      User.aggregate([
        { $match: { role: { $nin: ['Patient', 'SuperAdmin'] } } },
        { $group: { _id: '$hospitalId', staffCount: { $sum: 1 } } },
        {
          $lookup: {
            from: 'hospitals',
            localField: '_id',
            foreignField: '_id',
            as: 'hospital',
          },
        },
        { $unwind: { path: '$hospital', preserveNullAndEmpty: true } },
        {
          $project: {
            hospitalName: '$hospital.name',
            hospitalStatus: '$hospital.status',
            staffCount: 1,
          },
        },
        { $sort: { staffCount: -1 } },
      ]),
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalHospitals,
          activeHospitals,
          inactiveHospitals: totalHospitals - activeHospitals,
          totalPatients,
          totalDoctors,
          totalStaff,
        },
        staffByRole,
        hospitalPerformance: hospitalStaffBreakdown,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createHospital,
  getHospitals,
  getHospitalById,
  updateHospital,
  toggleHospitalStatus,
  getGlobalAnalytics,
};