const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: { type: Number, required: true, unique: true }, // Ensures only one report per year
    totalStudents: { type: Number, required: true },
    studentsPlaced: { type: Number, required: true },
    unplacedStudents: { type: Number, default: 0 },
    placementRate: { type: Number, default: 0 },
    offersMade: { type: Number, required: true },
    companiesParticipated: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// ** Automatically calculate placement rate before saving the report **
reportSchema.pre("save", function (next) {
  if (this.totalStudents > 0) {
    this.unplacedStudents = this.totalStudents - this.studentsPlaced;
    this.placementRate = ((this.studentsPlaced / this.totalStudents) * 100).toFixed(2);
  }
  next();
});

module.exports = mongoose.model("Report", reportSchema);
