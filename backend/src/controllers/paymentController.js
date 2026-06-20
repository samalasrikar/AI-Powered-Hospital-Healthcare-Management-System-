const Payment = require("../models/Payment");
const Invoice = require("../models/Invoice");

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("invoiceId")
      .populate("receivedBy");
    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createPayment = async (req, res) => {
  try {
    const { invoiceId, amount, paymentMethod, transactionId } = req.body;

    if (!invoiceId || !amount || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "invoiceId, amount and paymentMethod are required",
      });
    }

    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    const payment = await Payment.create({
      invoiceId,
      amount,
      paymentMethod,
      transactionId,
      receivedBy: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Payment recorded successfully",
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    const allowedStatuses = ["Pending", "Completed", "Failed", "Refunded"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status",
      });
    }

    // Update and save the payment status
    payment.status = status;
    await payment.save();

    // Side effect: Sync payment status to Invoice status
    if (status === "Completed") {
      await Invoice.findByIdAndUpdate(payment.invoiceId, {
        status: "Paid",
      });
    }

    if (status === "Failed") {
      await Invoice.findByIdAndUpdate(payment.invoiceId, {
        status: "Pending",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment status updated",
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getPayments,
  createPayment,
  updatePaymentStatus,
};
