const mongoose = require("mongoose");

const AcademicRecordSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      unique: true, // Ensures each student has only one academic record
      validate: {
        validator: function (value) {
          return /^[0-9a-fA-F]{24}$/.test(value.toString());
        },
        message: "Invalid student ID format.",
      },
    },
    grades: [
      {
        subject: { type: String, required: true, trim: true },
        score: { type: Number, required: true, min: 0, max: 100 },
      },
    ],
    achievements: {
      type: [{ type: String, trim: true }],
      default: [],
    },
    transcripts: {
      type: [{ type: String, trim: true, match: /^https?:\/\// }], // Ensures valid URLs
      default: [],
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Prevent Overwrite Error by Checking if Model Already Exists
const AcademicRecord =
  mongoose.models.AcademicRecord || mongoose.model("AcademicRecord", AcademicRecordSchema);

module.exports = AcademicRecord;
