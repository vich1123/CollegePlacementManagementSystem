const mongoose = require("mongoose");

const recruitmentStatusSchema = new mongoose.Schema({
  studentsPlaced: {
    type: Number,
    required: true,
  },
  offersMade: {
    type: Number,
    required: true,
  },
  companiesParticipated: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("RecruitmentStatus", recruitmentStatusSchema);
