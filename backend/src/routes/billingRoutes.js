const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const authorizeRoles = require("../middlewares/roleMiddleware");

const {
  generateInvoice,
  getInvoiceById,
  getAllInvoices,
} = require("../controllers/billingController");

router.post(
  "/generate",
  protect,
  authorizeRoles("BillingExecutive", "HospitalAdmin", "SuperAdmin"),
  generateInvoice
);

router.get(
  "/",
  protect,
  authorizeRoles("BillingExecutive", "HospitalAdmin", "SuperAdmin"),
  getAllInvoices
);

router.get(
  "/:id",
  protect,
  authorizeRoles("BillingExecutive", "HospitalAdmin", "SuperAdmin"),
  getInvoiceById
);

module.exports = router;