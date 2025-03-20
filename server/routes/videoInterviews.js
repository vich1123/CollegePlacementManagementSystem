const express = require("express");
const {
  scheduleVideoInterview,
  generateMeetingLink,
  sendVideoInterviewReminder,
  submitVideoInterviewFeedback,
  getVideoInterviewFeedback,
  deleteVideoInterview
} = require("../controllers/videoInterviewController");

const router = express.Router();

// Schedule a Video Interview
router.post("/schedule", scheduleVideoInterview);

// Generate Video Meeting Link (Zoom API / WebRTC Integration)
router.get("/:interviewId/generate-link", generateMeetingLink);

// Send Video Interview Reminder
router.post("/:interviewId/reminder", sendVideoInterviewReminder);

// Submit Feedback for Video Interview
router.post("/:interviewId/feedback", submitVideoInterviewFeedback);

// Get Feedback for a Video Interview
router.get("/:interviewId/feedback", getVideoInterviewFeedback);

// Delete a Video Interview
router.delete("/:interviewId", deleteVideoInterview);

module.exports = router;
