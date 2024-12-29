const mongoose = require("mongoose");

const placementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"], // Keep as true if needed
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title must be less than 100 characters"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      validate: {
        validator: (value) => value >= new Date().setHours(0, 0, 0, 0), // Ensure the date is today or later
        message: "Date must be today or later",
      },
    },
    companyId: {
      type: String,
      required: [true, "Company ID is required"],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
    },
    companies: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: false },
    ],
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: false },
    ],
    status: {
      type: String,
      enum: ["ongoing", "completed"],
      default: "ongoing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Placement", placementSchema);
