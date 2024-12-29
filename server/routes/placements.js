const mongoose = require("mongoose");

const placementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"], // Required title
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title must be less than 100 characters"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      validate: {
        validator: (value) => value >= new Date().setHours(0, 0, 0, 0), // Ensure date is today or later
        message: "Date must be today or later",
      },
    },
    companyId: {
      type: String,
      required: [true, "Company ID is required"], // Required field for companyId
    },
    position: {
      type: String,
      required: [true, "Position is required"], // Required field for position
    },
    companies: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: false }, // Optional
    ],
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: false }, // Optional
    ],
    status: {
      type: String,
      enum: ["ongoing", "completed"], // Status can only be ongoing or completed
      default: "ongoing",
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

module.exports = mongoose.model("Placement", placementSchema);
