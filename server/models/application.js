const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  coverLetter: { type: String, required: true },
  resume: { type: String, required: true }, // Stores file path
  status: { type: String, enum: ["pending", "reviewed", "rejected", "accepted"], default: "pending" },
  appliedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Application", ApplicationSchema);
