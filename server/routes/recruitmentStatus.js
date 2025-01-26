const express = require("express");
const {
  getRecruitmentStatus,
  createRecruitmentStatus,
} = require("../controllers/recruitmentStatusController");

const router = express.Router();

// Define Routes
router.get("/", getRecruitmentStatus);
router.post("/", createRecruitmentStatus);

module.exports = router;