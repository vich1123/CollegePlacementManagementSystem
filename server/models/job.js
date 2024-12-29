const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    requirements: { type: String }, // New field for job requirements
    salaryRange: { type: String }, // New field for salary details
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
