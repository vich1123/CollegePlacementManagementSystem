const Interview = require("../models/Interview");
const Student = require("../models/Student");
const Company = require("../models/Company");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Check if Twilio credentials are available before initializing
let twilioClient = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  const twilio = require("twilio");
  twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

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
    const { student, company, date, time, mode, interviewLink } = req.body;

    // Find student and company details
    const studentData = await Student.findById(student);
    const companyData = await Company.findById(company);

    if (!studentData || !companyData) {
      return res.status(404).json({ message: "Student or company not found" });
    }

    // Create interview entry
    const newInterview = new Interview({ student, company, date, time, mode, interviewLink });
    await newInterview.save();

    // Send Email Notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: studentData.email,
      subject: "Interview Scheduled",
      text: `Dear ${studentData.name},\n\nYour interview with ${companyData.name} has been scheduled.\n\nDetails:\n- Date: ${date}\n- Time: ${time}\n- Mode: ${mode}\n- Join Link: ${interviewLink}\n\nBest Regards,\nPlacement Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("Error sending email:", error);
      else console.log("Email sent:", info.response);
    });

    // Send SMS Notification (Twilio, if configured)
    if (twilioClient) {
      twilioClient.messages
        .create({
          body: `Interview Scheduled: ${companyData.name}, ${date} at ${time} (${mode}). Link: ${interviewLink}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: studentData.phone,
        })
        .then((message) => console.log("SMS sent:", message.sid))
        .catch((error) => console.log("Error sending SMS:", error));
    }

    res.status(201).json({ message: "Interview scheduled and notifications sent!" });
  } catch (error) {
    console.error("Error scheduling interview:", error);
    res.status(500).json({ message: "Server error" });
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
      text: `Dear ${interview.student.name},\n\nThis is a reminder for your upcoming interview.\n\nDetails:\n- Company: ${interview.company.name}\n- Date: ${interview.date}\n- Time: ${interview.time}\n- Mode: ${interview.mode}\n- Join Link: ${interview.interviewLink}\n\nBest of luck!\nPlacement Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("Error sending email:", error);
      else console.log("Reminder email sent:", info.response);
    });

    // SMS Notification (Twilio, if configured)
    if (twilioClient) {
      twilioClient.messages
        .create({
          body: `Reminder: Interview with ${interview.company.name} on ${interview.date} at ${interview.time}. Link: ${interview.interviewLink}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: interview.student.phone,
        })
        .then((message) => console.log("SMS reminder sent:", message.sid))
        .catch((error) => console.log("Error sending SMS:", error));
    }

    res.status(200).json({ message: "Interview reminder sent successfully!" });
  } catch (error) {
    console.error("Error sending reminder:", error);
    res.status(500).json({ message: "Server error" });
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

    res.status(200).json({ success: true, message: "Feedback submitted successfully", data: interview });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { scheduleInterview, sendInterviewReminder, submitFeedback, getFeedback };
