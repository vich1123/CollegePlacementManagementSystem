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

// Schedule an interview with notifications
const scheduleInterview = async (req, res) => {
  try {
    const { studentId, companyId, date, time, meetingLink } = req.body;

    // Ensure required fields are present
    if (!studentId || !companyId || !date || !time || !meetingLink) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find student and company details
    const student = await Student.findById(studentId);
    const company = await Company.findById(companyId);

    if (!student || !company) {
      return res.status(404).json({ message: "Student or company not found" });
    }

    // Create interview entry
    const newInterview = new Interview({ studentId, companyId, date, time, meetingLink, status: "Scheduled" });
    await newInterview.save();

    // Send Email Notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: student.email,
      subject: "Interview Scheduled",
      text: `Dear ${student.name},\n\nYour interview with ${company.name} has been scheduled.\n\nDetails:\n- Date: ${date}\n- Time: ${time}\n- Join Link: ${meetingLink}\n\nBest Regards,\nPlacement Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("Error sending email:", error);
      else console.log("Email sent:", info.response);
    });

    res.status(201).json({ message: "Interview scheduled successfully!", data: newInterview });
  } catch (error) {
    console.error("Error scheduling interview:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Send Interview Reminder
const sendInterviewReminder = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const interview = await Interview.findById(interviewId).populate("student company");

    if (!interview) return res.status(404).json({ message: "Interview not found" });

    // Email Notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: interview.student.email,
      subject: "Reminder: Upcoming Interview",
      text: `Dear ${interview.student.name},\n\nThis is a reminder for your upcoming interview.\n\nDetails:\n- Company: ${interview.company.name}\n- Date: ${interview.date}\n- Time: ${interview.time}\n- Join Link: ${interview.meetingLink}\n\nBest of luck!\nPlacement Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("Error sending email:", error);
      else console.log("Reminder email sent:", info.response);
    });

    res.status(200).json({ message: "Interview reminder sent successfully!" });
  } catch (error) {
    console.error("Error sending reminder:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Submit feedback for an interview
const submitFeedback = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const { feedback } = req.body;

    const interview = await Interview.findById(interviewId);
    if (!interview) return res.status(404).json({ message: "Interview not found" });

    interview.feedback = feedback;
    await interview.save();

    res.status(200).json({ message: "Feedback submitted successfully", data: interview });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get feedback for a specific interview
const getFeedback = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const interview = await Interview.findById(interviewId);

    if (!interview) return res.status(404).json({ message: "Interview not found" });

    res.status(200).json({ success: true, feedback: interview.feedback });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { scheduleInterview, sendInterviewReminder, submitFeedback, getFeedback };
