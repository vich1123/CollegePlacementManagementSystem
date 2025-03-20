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
      type: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
          comment: { type: String, trim: true, required: true },
          rating: { type: Number, required: true, min: 1, max: 5 },
        },
      ],
      default: [],
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
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

// Ensure uniqueness for company name (case-insensitive)
CompanySchema.index({ name: 1 }, { unique: true, collation: { locale: "en", strength: 2 } });

// Ensure uniqueness for email
CompanySchema.index({ contactEmail: 1 }, { unique: true });

// Method to Add Review and Update Rating
CompanySchema.methods.addReview = async function (userId, comment, rating) {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID format.");
    }

    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5.");
    }

    this.reviews.push({ userId, comment, rating });

    // Calculate new average rating
    const totalRatings = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.averageRating = this.reviews.length > 0 ? parseFloat((totalRatings / this.reviews.length).toFixed(2)) : 0;

    await this.save();
    return this;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = mongoose.model("Company", CompanySchema);
