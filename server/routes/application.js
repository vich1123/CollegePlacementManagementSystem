const express = require("express");
const multer = require("multer");
const {
  submitApplication,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  getApplicationsByStudent,
} = require("../controllers/applicationController");

const router = express.Router();

// Configure Multer for file uploads (storing resumes)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Submit a new application with resume upload
router.post("/", upload.single("resume"), submitApplication);

// Get all applications
router.get("/", getApplications);

// Get application by ID
router.get("/:id", getApplicationById);

// Get applications by student ID
router.get("/student/:studentId", getApplicationsByStudent);

// Update application status & feedback
router.put("/:id", updateApplicationStatus);

module.exports = router;
