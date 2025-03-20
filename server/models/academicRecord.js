const mongoose = require("mongoose");

const AcademicRecordSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      unique: true, // Ensures each student has only one academic record
    },
    grades: [
      {
        subject: { type: String, required: true },
        score: { type: Number, required: true, min: 0, max: 100 },
      },
    ],
    achievements: {
      type: [String], // Array of achievement descriptions
      default: [],
    },
    transcripts: {
      type: [String], // Array of transcript URLs or file references
      default: [],
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Prevent Overwrite Error by Checking if Model Already Exists
const AcademicRecord = mongoose.models.AcademicRecord || mongoose.model("AcademicRecord", AcademicRecordSchema);

module.exports = AcademicRecord;
