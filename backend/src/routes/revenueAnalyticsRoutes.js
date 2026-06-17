const express = require("express");

const {
  getRevenueAnalytics,
} = require("../controllers/revenueAnalyticsController");

const router = express.Router();

router.get("/", getRevenueAnalytics);

module.exports = router;