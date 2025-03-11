// server/routes/interviews.js
const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController'); 

// Ensure that all functions exist in the controller
router.get('/', interviewController.getInterviews || ((req, res) => res.status(501).json({ message: "Not Implemented" })));
router.get('/:interviewId/generate-link', interviewController.generateMeetingLink || ((req, res) => res.status(501).json({ message: "Not Implemented" })));
router.post('/schedule', interviewController.scheduleInterview);
router.post('/:interviewId/feedback', interviewController.submitFeedback);
router.get('/:interviewId/feedback', interviewController.getFeedback);

module.exports = router;
