const InsuranceClaim = require("../models/InsuranceClaim");
const Invoice = require("../models/Invoice");

const createClaim = async (req, res) => {
  try {
    const {
      invoiceId,
      insuranceProvider,
      claimAmount,
      remarks,
    } = req.body;

    if (!invoiceId || !insuranceProvider || !claimAmount) {
      return res.status(400).json({
        success: false,
        message:
          "invoiceId, insuranceProvider and claimAmount are required",
      });
    }

    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    const existingClaim = await InsuranceClaim.findOne({
      invoiceId,
    });

    if (existingClaim) {
      return res.status(400).json({
        success: false,
        message: "Insurance claim already exists for this invoice",
      });
    }

    const claim = await InsuranceClaim.create({
      invoiceId,
      insuranceProvider,
      claimAmount,
      remarks,
      createdBy: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Insurance claim created successfully",
      data: claim,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllClaims = async (req, res) => {
  try {
    const claims = await InsuranceClaim.find()
      .populate("invoiceId")
      .populate("createdBy");

    res.status(200).json({
      success: true,
      count: claims.length,
      data: claims,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getClaimById = async (req, res) => {
  try {
    const claim = await InsuranceClaim.findById(req.params.id)
      .populate("invoiceId")
      .populate("createdBy");

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    res.status(200).json({
      success: true,
      data: claim,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateClaimStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const claim = await InsuranceClaim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    const allowedStatuses = [
      "Submitted",
      "UnderReview",
      "Approved",
      "Rejected",
      "Settled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid claim status",
      });
    }

    claim.status = status;

    await claim.save();

    res.status(200).json({
      success: true,
      message: "Claim status updated",
      data: claim,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createClaim,
  getAllClaims,
  getClaimById,
  updateClaimStatus,
};