const express = require("express");

const {
  getInsights,
} = require("../controllers/operationsAnalyticsController");

const router = express.Router();

router.post("/", getInsights);

module.exports = router;