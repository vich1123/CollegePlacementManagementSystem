const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    totalStudents: { type: Number, required: true },
    studentsPlaced: { type: Number, required: true },
    offersMade: { type: Number, required: true },
    companiesParticipated: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  }
);

module.exports = mongoose.model("Report", reportSchema);
