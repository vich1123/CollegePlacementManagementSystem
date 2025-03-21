const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  jobTitle: { type: String, required: true }, // Job title added for clarity
  coverLetter: { type: String, required: true },
  resume: { type: String, required: true }, // Stores file path
  status: { 
    type: String, 
    enum: ["Submitted", "Reviewed", "Shortlisted", "Selected", "Rejected", "On-Hold"], 
    default: "Submitted" 
  },
  feedback: { type: String, default: "No feedback yet" }, // Feedback from company
  communicationMessage: { type: String, default: "No messages yet" }, // Recruiter messages
  appliedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Application", ApplicationSchema);
