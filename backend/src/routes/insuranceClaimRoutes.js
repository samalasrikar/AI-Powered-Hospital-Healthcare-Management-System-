const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const {
  createClaim,
  getAllClaims,
  getClaimById,
  updateClaimStatus,
} = require("../controllers/insuranceClaimController");

router.post(
  "/",
  protect,
  authorizeRoles(
    "BillingExecutive",
    "HospitalAdmin",
    "SuperAdmin"
  ),
  createClaim
);

router.get(
  "/",
  protect,
  authorizeRoles(
    "BillingExecutive",
    "HospitalAdmin",
    "SuperAdmin"
  ),
  getAllClaims
);

router.get(
  "/:id",
  protect,
  authorizeRoles(
    "BillingExecutive",
    "HospitalAdmin",
    "SuperAdmin"
  ),
  getClaimById
);

router.put(
  "/:id/status",
  protect,
  authorizeRoles(
    "HospitalAdmin",
    "SuperAdmin"
  ),
  updateClaimStatus
);

module.exports = router;