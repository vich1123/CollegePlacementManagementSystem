const Interview = require("../models/Interview");
const Student = require("../models/Student");
const Company = require("../models/Company");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Email Transporter Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Schedule an interview with email notifications
 * @route POST /api/videointerviews/schedule
 */
const scheduleInterview = async (req, res) => {
  try {
    const { studentId, companyId, date, time, meetingLink } = req.body;

    // Validate required fields
    if (!studentId || !companyId || !date || !time || !meetingLink) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Find student and company details
    const student = await Student.findById(studentId);
    const company = await Company.findById(companyId);

    if (!student || !company) {
      return res.status(404).json({ success: false, message: "Student or company not found" });
    }

    // Create interview entry
    const newInterview = new Interview({
      studentId,
      companyId,
      date,
      time,
      meetingLink,
      status: "Scheduled",
    });
    await newInterview.save();

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: student.email,
      subject: "Interview Scheduled",
      text: `Dear ${student.name},\n\nYour interview with ${company.name} has been scheduled.\n\nDetails:\n- Date: ${date}\n- Time: ${time}\n- Join Link: ${meetingLink}\n\nBest Regards,\nPlacement Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.error("Error sending email:", error);
      else console.log("Email sent:", info.response);
    });

    res.status(201).json({
      success: true,
      message: "Interview scheduled successfully!",
      data: newInterview,
    });
  } catch (error) {
    console.error("Error scheduling interview:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

/**
 * Generate a video meeting link for an interview
 * @route GET /api/videointerviews/:interviewId/generate-link
 */
const generateMeetingLink = async (req, res) => {
  try {
    const { interviewId } = req.params;

    const interview = await Interview.findById(interviewId);
    if (!interview) return res.status(404).json({ success: false, message: "Interview not found" });

    // Simulate meeting link generation (replace with Zoom API or WebRTC)
    const meetingLink = `https://zoom.us/j/${interviewId}`;

    // Save generated link to the interview record
    interview.meetingLink = meetingLink;
    await interview.save();

    res.status(200).json({ success: true, meetingLink });
  } catch (error) {
    console.error("Error generating meeting link:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

/**
 * Send interview reminder email
 * @route POST /api/videointerviews/:interviewId/reminder
 */
const sendInterviewReminder = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const interview = await Interview.findById(interviewId).populate("studentId companyId");

    if (!interview) return res.status(404).json({ success: false, message: "Interview not found" });

    // Prepare email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: interview.studentId.email,
      subject: "Reminder: Upcoming Interview",
      text: `Dear ${interview.studentId.name},\n\nThis is a reminder for your upcoming interview.\n\nDetails:\n- Company: ${interview.companyId.name}\n- Date: ${interview.date}\n- Time: ${interview.time}\n- Join Link: ${interview.meetingLink}\n\nBest of luck!\nPlacement Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.error("Error sending email:", error);
      else console.log("Reminder email sent:", info.response);
    });

    res.status(200).json({ success: true, message: "Interview reminder sent successfully!" });
  } catch (error) {
    console.error("Error sending reminder:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

/**
 * Submit feedback for an interview
 * @route POST /api/videointerviews/:interviewId/feedback
 */
const submitFeedback = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const { feedback } = req.body;

    const interview = await Interview.findById(interviewId);
    if (!interview) return res.status(404).json({ success: false, message: "Interview not found" });

    interview.feedback = feedback;
    await interview.save();

    res.status(200).json({ success: true, message: "Feedback submitted successfully", data: interview });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

/**
 * Get feedback for a specific interview
 * @route GET /api/videointerviews/:interviewId/feedback
 */
const getFeedback = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const interview = await Interview.findById(interviewId);

    if (!interview) return res.status(404).json({ success: false, message: "Interview not found" });

    res.status(200).json({ success: true, feedback: interview.feedback });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

/**
 * Delete an interview
 * @route DELETE /api/videointerviews/:interviewId
 */
const deleteInterview = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const interview = await Interview.findByIdAndDelete(interviewId);

    if (!interview) return res.status(404).json({ success: false, message: "Interview not found" });

    res.status(200).json({ success: true, message: "Interview deleted successfully" });
  } catch (error) {
    console.error("Error deleting interview:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// Export functions
module.exports = {
  scheduleInterview,
  generateMeetingLink,
  sendInterviewReminder,
  submitFeedback,
  getFeedback,
  deleteInterview,
};
