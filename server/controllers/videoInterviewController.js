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

    if (!studentId || !companyId || !date || !time) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const student = await Student.findById(studentId);
    const company = await Company.findById(companyId);

    if (!student || !company) {
      return res.status(404).json({ success: false, message: "Student or company not found" });
    }

    const interview = new Interview({
      studentId,
      companyId,
      date,
      time,
      meetingLink: meetingLink || `https://zoom.us/j/${studentId}-${companyId}`, // Mocked Zoom/WebRTC link
      status: "Scheduled",
    });

    await interview.save();

    // Send Email Notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: student.email,
      subject: "Your Video Interview is Scheduled",
      text: `Dear ${student.name},\n\nYour interview with ${company.name} is scheduled.\n\nDetails:\n- Date: ${date}\n- Time: ${time}\n- Meeting Link: ${interview.meetingLink}\n\nBest regards,\nPlacement Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("Email Error:", error);
      else console.log("Email Sent:", info.response);
    });

    res.status(201).json({ success: true, message: "Interview scheduled successfully!", data: interview });
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

    interview.meetingLink = `https://zoom.us/j/${interviewId}`;

    await interview.save();
    res.status(200).json({ success: true, meetingLink: interview.meetingLink });
  } catch (error) {
    console.error("Error generating meeting link:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

/**
 * Send an interview reminder email
 * @route POST /api/videointerviews/:interviewId/reminder
 */
const sendInterviewReminder = async (req, res) => {
  try {
    const { interviewId } = req.params;

    const interview = await Interview.findById(interviewId).populate("studentId companyId");

    if (!interview) return res.status(404).json({ success: false, message: "Interview not found" });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: interview.studentId.email,
      subject: "Reminder: Upcoming Interview",
      text: `Dear ${interview.studentId.name},\n\nReminder: Your interview with ${interview.companyId.name} is scheduled.\n\nDetails:\n- Date: ${interview.date}\n- Time: ${interview.time}\n- Meeting Link: ${interview.meetingLink}\n\nBest regards,\nPlacement Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("Email Error:", error);
      else console.log("Reminder Email Sent:", info.response);
    });

    res.status(200).json({ success: true, message: "Reminder sent successfully!" });
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

// Exporting Functions
module.exports = {
  scheduleInterview,
  generateMeetingLink,
  sendInterviewReminder,
  submitFeedback,
  deleteInterview,
};
