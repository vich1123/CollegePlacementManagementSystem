const mongoose = require('mongoose');

const AcademicRecordSchema = new mongoose.Schema({
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student',
    required: true,
    index: true
  },
  grades: [
    {
      subject: { type: String, required: true },
      score: { type: Number, required: true },
    }
  ],
  achievements: [{ type: String }], // Store multiple achievements
  transcripts: [{ type: String }], // Store multiple transcript URLs
  lastUpdated: { type: Date, default: Date.now } // Track last modification
});

module.exports = mongoose.model("AcademicRecord", AcademicRecordSchema);
