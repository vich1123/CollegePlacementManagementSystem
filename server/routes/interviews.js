const express = require("express");
const {
  scheduleInterview,
  sendInterviewReminder,
  submitFeedback,
  getFeedback
} = require("../controllers/interviewController");

const router = express.Router();

// Schedule an Interview
router.post("/schedule", scheduleInterview);

// Send Interview Reminder
router.post("/:interviewId/reminder", sendInterviewReminder);

// Submit Feedback for Interview
router.post("/:interviewId/feedback", submitFeedback);

// Get Feedback for Interview
router.get("/:interviewId/feedback", getFeedback);

module.exports = router;
