const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  schedule: { type: Date, required: true },
});

module.exports = mongoose.model('Interview', InterviewSchema);