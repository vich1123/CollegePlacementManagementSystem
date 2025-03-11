const express = require("express");
const router = express.Router();
const {
  getRecruitmentStatusHistory,
  getLatestRecruitmentStatus,
  createRecruitmentStatus,
  deleteRecruitmentStatus
} = require("../controllers/recruitmentStatusController");

// Fetch recruitment status history (for charts)
router.get("/history", getRecruitmentStatusHistory);

// Fetch latest recruitment status
router.get("/latest", getLatestRecruitmentStatus);

// Create recruitment status
router.post("/", createRecruitmentStatus);

// Delete all recruitment statuses
router.delete("/", deleteRecruitmentStatus);

module.exports = router;
