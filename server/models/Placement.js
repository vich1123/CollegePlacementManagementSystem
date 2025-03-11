const mongoose = require("mongoose");

const placementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title must be less than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",  // Ensures `companyId` references the `Company` collection
      required: true
    },
    eligibleCourses: [{ type: String }], // List of eligible courses
    deadline: { type: Date }, // Application deadline
    salaryPackage: { type: String }, // Salary offered
    location: { type: String }, // Job location
    status: {
      type: String,
      enum: ["ongoing", "completed"],
      default: "ongoing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Placement", placementSchema);
