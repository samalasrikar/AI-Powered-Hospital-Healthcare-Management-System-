const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const {
  getRevenueAnalytics,
} = require("../controllers/revenueAnalyticsController");

router.get(
  "/",
  protect,
  authorizeRoles(
    "BillingExecutive",
    "HospitalAdmin",
    "SuperAdmin"
  ),
  getRevenueAnalytics
);

module.exports = router;