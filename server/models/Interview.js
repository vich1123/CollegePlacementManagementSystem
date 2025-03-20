const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  meetingLink: { type: String, required: true },
  status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"], default: "Scheduled" },
  feedback: { type: String, default: "" }
});

module.exports = mongoose.model("Interview", InterviewSchema);
