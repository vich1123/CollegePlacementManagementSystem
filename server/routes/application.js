const express = require("express");
const multer = require("multer");
const {
  submitApplication,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  getApplicationsByStudent,
  getCompanyApplications,
  deleteApplication
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

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// ** Routes **

// Submit a new application with resume upload
router.post("/", upload.single("resume"), submitApplication);

// Get applications by student ID (Tracking & Status Feature)
router.get("/student/:studentId", getApplicationsByStudent);

// Get applications for a specific company
router.get("/company/:companyId", getCompanyApplications);

// Get all applications (Admin View)
router.get("/", getApplications);

// Get application by ID
router.get("/:id", getApplicationById);

// Update application status, feedback, and communication messages
router.put("/:id", updateApplicationStatus);

// Delete an application
router.delete("/:id", deleteApplication);

module.exports = router;
