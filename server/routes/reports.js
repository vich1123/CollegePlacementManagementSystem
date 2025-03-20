const express = require("express");
const router = express.Router();
const {
  getReports,
  getReportByYear,
  createReport,
  updateReport,
  deleteReport,
  getPlacementTrends,
} = require("../controllers/reportController");

// ** Placement Trends API (Before `/:year` to prevent conflicts) **
router.get("/trends", getPlacementTrends);

// ** Report Management Routes **
router.get("/", getReports);
router.get("/:year", getReportByYear);
router.post("/", createReport);
router.put("/:id", updateReport);
router.delete("/:id", deleteReport);

module.exports = router;
