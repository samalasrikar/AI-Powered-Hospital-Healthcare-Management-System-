const express = require("express");
const {
  appointmentAssistant,
} = require("../controllers/appointmentAssistantController");

const router = express.Router();

router.post("/", appointmentAssistant);

module.exports = router;