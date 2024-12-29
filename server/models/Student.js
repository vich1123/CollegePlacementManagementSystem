const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  resumeLink: { type: String, required: true },
  course: { type: String, required: true },
});

module.exports = mongoose.model('Student', StudentSchema);