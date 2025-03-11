const express = require("express");
const router = express.Router();
const { getReports, createReport } = require("../controllers/reportController");

// Route to get all reports
router.get("/", getReports);

// Route to create a new report
router.post("/", createReport);

module.exports = router;
