const mongoose = require("mongoose");

const placementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title must be less than 100 characters"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      validate: {
        validator: (value) => value >= new Date(),
        message: "Date must be today or later",
      },
    },
    companies: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    ],
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    ],
    status: {
      type: String,
      enum: ["ongoing", "completed"],
      default: "ongoing",
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("Placement", placementSchema);
