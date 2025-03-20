const express = require("express");
const router = express.Router();
const { 
  sendNotification, 
  sendInterviewNotification, 
  sendInterviewReminder, 
  sendInterviewConfirmation 
} = require("../controllers/notificationController");

// General notification
router.post("/send", sendNotification);

// Send interview invitation
router.post("/interview", sendInterviewNotification);

// Send interview reminder
router.post("/interview/reminder", sendInterviewReminder);

// Send interview confirmation
router.post("/interview/confirmation", sendInterviewConfirmation);

module.exports = router;
