const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rollNumber: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  phoneNumber: { type: String },
  resumeLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value.startsWith("http"),
      message: "Resume link must be a valid URL.",
    },
  },
  course: { type: String, required: true },
  academicRecords: [{ subject: String, grade: String, transcriptLink: String }],
  skills: [{ type: String }],
  placementStatus: { type: String, enum: ["not placed", "placed"], default: "not placed" },
  reviews: [{ type: String }], // Added review functionality
  dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Student", StudentSchema);
