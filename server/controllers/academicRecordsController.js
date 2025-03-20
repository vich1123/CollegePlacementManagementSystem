const AcademicRecord = require("../models/academicRecord");
const mongoose = require("mongoose");

// Validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id) && /^[0-9a-fA-F]{24}$/.test(id);

// Fetch all academic records
const getAcademicRecords = async (req, res) => {
  try {
    const records = await AcademicRecord.find().populate("studentId", "name email");
    if (!records.length) {
      return res.status(404).json({ success: false, message: "No academic records found." });
    }
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    console.error("Error fetching academic records:", error);
    res.status(500).json({ success: false, message: "Error fetching academic records", error: error.message });
  }
};

// Fetch a specific student's academic record
const getAcademicRecordByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!isValidObjectId(studentId)) {
      return res.status(400).json({ success: false, message: "Invalid student ID format." });
    }

    const record = await AcademicRecord.findOne({ studentId }).populate("studentId", "name email");
    if (!record) {
      return res.status(404).json({ success: false, message: "Academic record not found." });
    }

    res.status(200).json({ success: true, data: record });
  } catch (error) {
    console.error("Error fetching academic record:", error);
    res.status(500).json({ success: false, message: "Error fetching academic record", error: error.message });
  }
};

// Add or update an academic record
const addOrUpdateAcademicRecord = async (req, res) => {
  try {
    const { studentId, grades = [], achievements = [], transcripts = [] } = req.body;

    if (!isValidObjectId(studentId)) {
      return res.status(400).json({ success: false, message: "Invalid student ID format." });
    }

    let record = await AcademicRecord.findOne({ studentId });

    if (!record) {
      record = new AcademicRecord({ studentId, grades, achievements, transcripts });
    } else {
      record.grades = grades.length ? grades : record.grades;
      record.achievements = achievements.length ? achievements : record.achievements;
      record.transcripts = transcripts.length ? transcripts : record.transcripts;
    }

    await record.save();
    res.status(200).json({ success: true, message: "Academic record added/updated", data: record });
  } catch (error) {
    console.error("Error updating academic record:", error);
    res.status(500).json({ success: false, message: "Error updating academic record", error: error.message });
  }
};

// Update an academic record
const updateAcademicRecord = async (req, res) => {
  try {
    const { studentId } = req.params;
    const updatedData = req.body;

    if (!isValidObjectId(studentId)) {
      return res.status(400).json({ success: false, message: "Invalid student ID format." });
    }

    const record = await AcademicRecord.findOneAndUpdate({ studentId }, updatedData, { new: true });

    if (!record) {
      return res.status(404).json({ success: false, message: "Academic record not found." });
    }

    res.status(200).json({ success: true, message: "Academic record updated", data: record });
  } catch (error) {
    console.error("Error updating academic record:", error);
    res.status(500).json({ success: false, message: "Error updating academic record", error: error.message });
  }
};

// Add a grade to an academic record
const addGradeToAcademicRecord = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { subject, score } = req.body;

    if (!isValidObjectId(studentId)) {
      return res.status(400).json({ success: false, message: "Invalid student ID format." });
    }

    const record = await AcademicRecord.findOne({ studentId });

    if (!record) {
      return res.status(404).json({ success: false, message: "Academic record not found." });
    }

    record.grades.push({ subject, score });
    await record.save();

    res.status(200).json({ success: true, message: "Grade added successfully", data: record });
  } catch (error) {
    console.error("Error adding grade:", error);
    res.status(500).json({ success: false, message: "Error adding grade", error: error.message });
  }
};

// Add an achievement to an academic record
const addAchievementToAcademicRecord = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { achievement } = req.body;

    if (!isValidObjectId(studentId)) {
      return res.status(400).json({ success: false, message: "Invalid student ID format." });
    }

    const record = await AcademicRecord.findOne({ studentId });

    if (!record) {
      return res.status(404).json({ success: false, message: "Academic record not found." });
    }

    record.achievements.push(achievement);
    await record.save();

    res.status(200).json({ success: true, message: "Achievement added successfully", data: record });
  } catch (error) {
    console.error("Error adding achievement:", error);
    res.status(500).json({ success: false, message: "Error adding achievement", error: error.message });
  }
};

// Add a transcript to an academic record
const addTranscriptToAcademicRecord = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { transcript } = req.body;

    if (!isValidObjectId(studentId)) {
      return res.status(400).json({ success: false, message: "Invalid student ID format." });
    }

    const record = await AcademicRecord.findOne({ studentId });

    if (!record) {
      return res.status(404).json({ success: false, message: "Academic record not found." });
    }

    record.transcripts.push(transcript);
    await record.save();

    res.status(200).json({ success: true, message: "Transcript added successfully", data: record });
  } catch (error) {
    console.error("Error adding transcript:", error);
    res.status(500).json({ success: false, message: "Error adding transcript", error: error.message });
  }
};

// Delete an academic record
const deleteAcademicRecord = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid academic record ID format." });
    }

    const record = await AcademicRecord.findByIdAndDelete(id);
    if (!record) {
      return res.status(404).json({ success: false, message: "Academic record not found." });
    }

    res.status(200).json({ success: true, message: "Academic record deleted." });
  } catch (error) {
    console.error("Error deleting academic record:", error);
    res.status(500).json({ success: false, message: "Error deleting academic record", error: error.message });
  }
};

// Export functions
module.exports = {
  getAcademicRecords,
  getAcademicRecordByStudent,
  addOrUpdateAcademicRecord,
  updateAcademicRecord,
  addGradeToAcademicRecord,
  addAchievementToAcademicRecord,
  addTranscriptToAcademicRecord,
  deleteAcademicRecord,
};
