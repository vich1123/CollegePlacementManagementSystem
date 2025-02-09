const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  jobPostings: { type: [String], required: true },
});

module.exports = mongoose.model("Company", CompanySchema);
