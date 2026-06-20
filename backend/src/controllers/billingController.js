const Invoice = require("../models/Invoice");
const Patient = require("../models/Patient");
const Hospital = require("../models/Hospital");

const generateInvoice = async (req, res) => {
  try {
    const {
      patientId,
      consultationCharges = 0,
      labCharges = 0,
      medicineCharges = 0,
      admissionCharges = 0,
    } = req.body;

    // Validation
    if (!patientId) {
      return res.status(400).json({
        success: false,
        message: "patientId is required",
      });
    }

    if (
      consultationCharges < 0 ||
      labCharges < 0 ||
      medicineCharges < 0 ||
      admissionCharges < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Charges cannot be negative",
      });
    }

    // Check patient exists
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    // Check hospital exists
    const hospital = await Hospital.findById(req.user.hospitalId);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    // Calculate total automatically
    const totalAmount =
      consultationCharges +
      labCharges +
      medicineCharges +
      admissionCharges;

    // Create invoice
    const invoice = await Invoice.create({
      patientId,
      hospitalId: req.user.hospitalId,
      consultationCharges,
      labCharges,
      medicineCharges,
      admissionCharges,
      totalAmount,
      generatedBy: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Invoice generated successfully",
      data: invoice,
    });
  } catch (error) {
    console.error("Generate Invoice Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("patientId")
      .populate("hospitalId")
      .populate("generatedBy");

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("patientId")
      .populate("hospitalId")
      .populate("generatedBy");

    res.status(200).json({
      success: true,
      count: invoices.length,
      data: invoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateInvoice,
  getInvoiceById,
  getAllInvoices,
};