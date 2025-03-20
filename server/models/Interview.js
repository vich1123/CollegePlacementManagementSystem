const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value); // Ensures time format HH:MM
        },
        message: "Invalid time format. Use HH:MM (24-hour format).",
      },
    },
    meetingLink: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})([/\w .-]*)*\/?$/i.test(value); // Ensures it's a valid URL
        },
        message: "Invalid meeting link URL.",
      },
    },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },
    feedback: {
      type: String,
      default: "",
      trim: true, // Trims unnecessary spaces
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

module.exports = mongoose.model("Interview", InterviewSchema);
