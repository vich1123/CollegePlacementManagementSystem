const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Company name is required"],
      unique: true,
      trim: true,
    },
    jobPostings: {
      type: [String],
      default: [],
    },
    reviews: {
      type: [String],
      default: [],
    },
    contactEmail: {
      type: String,
      required: [true, "Contact email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Please enter a valid email address",
      ],
    },
    location: {
      type: String,
      default: "Not provided",
      trim: true,
    },
    industry: {
      type: String,
      default: "Not specified",
      trim: true,
    },
    website: {
      type: String,
      default: "",
      trim: true,
    },
    dateAdded: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Case-insensitive uniqueness for `name`
CompanySchema.index({ name: 1 }, { unique: true, collation: { locale: "en", strength: 2 } });

// Ensuring uniqueness for email
CompanySchema.index({ contactEmail: 1 }, { unique: true });

module.exports = mongoose.model("Company", CompanySchema);
