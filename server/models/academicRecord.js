const mongoose = require("mongoose");

const academicRecordSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  grades: { type: Array, default: [] },
  achievements: { type: Array, default: [] },
  transcripts: { type: String, default: "" },
  lastUpdated: { type: Date, default: Date.now }
});

const AcademicRecord = mongoose.models.AcademicRecord || mongoose.model("AcademicRecord", academicRecordSchema);

module.exports = AcademicRecord;
