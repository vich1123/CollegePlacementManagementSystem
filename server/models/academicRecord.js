const mongoose = require("mongoose");

const academicRecordSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  grades: { type: Array, default: [] },
  achievements: { type: String, default: "" },
  transcripts: { type: String, default: "" },
  lastUpdated: { type: Date, default: Date.now }
});

// Prevent model overwriting by checking if it already exists
const AcademicRecord = mongoose.models.AcademicRecord || mongoose.model("AcademicRecord", academicRecordSchema);

module.exports = AcademicRecord;
