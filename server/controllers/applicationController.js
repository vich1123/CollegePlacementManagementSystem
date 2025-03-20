const Application = require("../models/Application");
const Student = require("../models/Student");
const Company = require("../models/Company");
const mongoose = require("mongoose");

// Validate MongoDB Object ID
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Submit a Job Application
exports.submitApplication = async (req, res) => {
  try {
    const { studentId, companyId, jobTitle, coverLetter } = req.body;
    const resume = req.file ? req.file.path : null;

    if (!studentId || !companyId || !jobTitle || !coverLetter || !resume) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!isValidObjectId(studentId) || !isValidObjectId(companyId)) {
      return res.status(400).json({ message: "Invalid student or company ID." });
    }

    const newApplication = new Application({
      student: studentId,
      company: companyId,
      jobTitle,
      coverLetter,
      resume,
      status: "Submitted",
    });

    await newApplication.save();
    res.status(201).json({ message: "Application submitted successfully!", data: newApplication });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ message: "Error processing application.", error: error.message });
  }
};

// Fetch All Applications (Admin)
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("student", "name email")
      .populate("company", "name");

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
};

// Get Application by ID
exports.getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid application ID format." });
    }

    const application = await Application.findById(id)
      .populate("student", "name email")
      .populate("company", "name");

    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ message: "Error fetching application", error: error.message });
  }
};

// Get Applications by Student ID
exports.getApplicationsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!isValidObjectId(studentId)) {
      return res.status(400).json({ message: "Invalid student ID format." });
    }

    const applications = await Application.find({ student: studentId })
      .populate("company", "name")
      .select("jobTitle status feedback communicationMessage company appliedAt");

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
};

// Update Application Status, Feedback, and Communication Messages
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, feedback, communicationMessage } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid application ID format." });
    }

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

    // Notify the student
    const student = await Student.findById(application.student);
    if (student) {
      console.log(`Notification: Sent email to ${student.email} regarding application status update.`);
    }

    res.status(200).json({ message: "Application updated successfully", data: application });
  } catch (error) {
    res.status(500).json({ message: "Error updating application", error: error.message });
  }
};

// Fetch All Applications for a Specific Company
exports.getCompanyApplications = async (req, res) => {
  try {
    const { companyId } = req.params;
    if (!isValidObjectId(companyId)) {
      return res.status(400).json({ message: "Invalid company ID format." });
    }

    const applications = await Application.find({ company: companyId })
      .populate("student", "name email")
      .select("jobTitle status feedback communicationMessage appliedAt");

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
};

// Delete an Application
exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid application ID format." });
    }

    const application = await Application.findByIdAndDelete(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting application", error: error.message });
  }
};

module.exports = {
  submitApplication,
  getApplications,
  getApplicationById,
  getApplicationsByStudent,
  updateApplicationStatus,
  getCompanyApplications,
  deleteApplication,
};
