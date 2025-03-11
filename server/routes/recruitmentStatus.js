const express = require("express");
const router = express.Router();
const {
  getRecruitmentStatusHistory,
  getLatestRecruitmentStatus,
  createRecruitmentStatus,
  deleteRecruitmentStatus
} = require("../controllers/recruitmentStatusController");

// Middleware to log incoming requests (for debugging)
router.use((req, res, next) => {
  console.log(`Recruitment API Request: ${req.method} ${req.originalUrl}`);
  next();
});

router.get("/history", async (req, res) => {
  try {
    const history = await getRecruitmentStatusHistory();
    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching recruitment history:", error);
    res.status(500).json({ success: false, message: "Failed to fetch recruitment history", error: error.message });
  }
});

router.get("/latest", async (req, res) => {
  try {
    const latestStatus = await getLatestRecruitmentStatus();
    res.status(200).json(latestStatus);
  } catch (error) {
    console.error("Error fetching latest recruitment status:", error);
    res.status(500).json({ success: false, message: "Failed to fetch latest recruitment status", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.studentsPlaced || !req.body.offersMade || !req.body.companiesParticipated) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    const newStatus = await createRecruitmentStatus(req.body);
    res.status(201).json({ success: true, message: "Recruitment status added successfully!", data: newStatus });
  } catch (error) {
    console.error("Error creating recruitment status:", error);
    res.status(500).json({ success: false, message: "Failed to create recruitment status", error: error.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    await deleteRecruitmentStatus();
    res.status(200).json({ success: true, message: "All recruitment statuses deleted successfully!" });
  } catch (error) {
    console.error("Error deleting recruitment statuses:", error);
    res.status(500).json({ success: false, message: "Failed to delete recruitment statuses", error: error.message });
  }
});

router.use((req, res) => {
  res.status(404).json({ success: false, message: "Invalid recruitment status route." });
});

module.exports = router;
