const express = require("express");
const router = express.Router();
const {
  getRecruitmentStatusHistory,
  getLatestRecruitmentStatus,
  createRecruitmentStatus,
  deleteAllRecruitmentStatuses,
  deleteRecruitmentStatusById,
} = require("../controllers/recruitmentStatusController");

// Middleware to log incoming requests (for debugging)
router.use((req, res, next) => {
  console.log(`Recruitment API Request: ${req.method} ${req.originalUrl}`);
  next();
});

// Get recruitment history
router.get("/history", getRecruitmentStatusHistory);

// Get the latest recruitment status
router.get("/latest", getLatestRecruitmentStatus);

// Create new recruitment status
router.post("/", createRecruitmentStatus);

// Delete all recruitment statuses
router.delete("/", deleteAllRecruitmentStatuses);

// Delete a specific recruitment status by ID
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  if (!id || id.length !== 24) {
    return res.status(400).json({ success: false, message: "Invalid recruitment status ID format." });
  }
  deleteRecruitmentStatusById(req, res, next);
});

// Handle invalid routes
router.use((req, res) => {
  res.status(404).json({ success: false, message: "Invalid recruitment status route." });
});

module.exports = router;
