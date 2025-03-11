const Application = require("../models/Application");
const Student = require("../models/Student");
const mongoose = require("mongoose");

// Submit a job application
exports.submitApplication = async (req, res) => {
  const { studentId, companyId, coverLetter } = req.body;
  const resume = req.file ? req.file.path : null;

  if (!studentId || !companyId || !coverLetter || !resume) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newApplication = new Application({ studentId, companyId, coverLetter, resume, status: "Submitted" });
    await newApplication.save();
    res.status(201).json({ message: "Application submitted successfully!", data: newApplication });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ message: "Error processing application." });
  }
};

// Fetch all applications
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate("studentId companyId");
    if (!applications.length) {
      return res.status(404).json({ message: "No applications found." });
    }
    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
};

// Get application by ID
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate("studentId companyId");
    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }
    res.status(200).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ message: "Error fetching application", error: error.message });
  }
};

// Get applications by student ID (WITH STATUS, FEEDBACK & COMMUNICATION)
exports.getApplicationsByStudent = async (req, res) => {
  try {
    const applications = await Application.find({ studentId: req.params.studentId })
      .populate("companyId", "name") // Fetch company name
      .select("jobTitle status feedback communicationMessage companyId createdAt"); // Include status, feedback, and communication message

    if (!applications.length) {
      return res.status(404).json({ message: "No applications found for this student." });
    }

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
};

// **Update application status & feedback (Company Review)**
exports.updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status, feedback, communicationMessage } = req.body;

  try {
    if (!["Submitted", "Reviewed", "Shortlisted", "Selected", "Rejected", "On-Hold"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updateData = { status };
    if (feedback) updateData.feedback = feedback;
    if (communicationMessage) updateData.communicationMessage = communicationMessage;

    const application = await Application.findByIdAndUpdate(id, updateData, { new: true });

    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    // Fetch student email for notification (Optional)
    const student = await Student.findById(application.studentId);
    if (student) {
      console.log(`Notification: Sent email to ${student.email} regarding application status update.`);
    }

    res.status(200).json({ message: "Application reviewed successfully!", data: application });
  } catch (error) {
    res.status(500).json({ message: "Error updating application", error: error.message });
  }
};

// Fetch all applications for a specific company
exports.getCompanyApplications = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const applications = await Application.find({ companyId })
      .populate("studentId", "name email")
      .select("jobTitle status feedback communicationMessage createdAt");

    if (!applications.length) {
      return res.status(404).json({ message: "No applications found for this company." });
    }

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    console.error("Error fetching company applications:", error);
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
};

module.exports = {
  submitApplication,
  getApplications,
  getApplicationById,
  getApplicationsByStudent,
  updateApplicationStatus,
  getCompanyApplications,
};
