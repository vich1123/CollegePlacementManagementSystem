const AcademicRecord = require("../models/academicRecord");

// Fetch all academic records
const getAcademicRecords = async (req, res) => {
  try {
    const records = await AcademicRecord.find().populate("studentId", "name email");
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching academic records", error: error.message });
  }
};

// Fetch a specific student's academic record
const getAcademicRecordByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const record = await AcademicRecord.findOne({ studentId }).populate("studentId", "name email");

    if (!record) {
      return res.status(404).json({ success: false, message: "Academic record not found" });
    }

    res.status(200).json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching academic record", error: error.message });
  }
};

// Add or update an academic record
const addOrUpdateAcademicRecord = async (req, res) => {
  try {
    const { studentId, grades, achievements, transcripts } = req.body;

    let record = await AcademicRecord.findOne({ studentId });

    if (!record) {
      record = new AcademicRecord({ studentId, grades, achievements, transcripts });
    } else {
      record.grades = grades || record.grades;
      record.achievements = achievements || record.achievements;
      record.transcripts = transcripts || record.transcripts;
    }

    await record.save();
    res.status(200).json({ success: true, message: "Academic record added/updated", data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating academic record", error: error.message });
  }
};

// Update an academic record
const updateAcademicRecord = async (req, res) => {
  try {
    const { studentId } = req.params;
    const updatedData = req.body;

    const record = await AcademicRecord.findOneAndUpdate({ studentId }, updatedData, { new: true });

    if (!record) {
      return res.status(404).json({ success: false, message: "Academic record not found" });
    }

    res.status(200).json({ success: true, message: "Academic record updated", data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating academic record", error: error.message });
  }
};

// Add a grade to an academic record
const addGradeToAcademicRecord = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { subject, score } = req.body;

    const record = await AcademicRecord.findOne({ studentId });

    if (!record) {
      return res.status(404).json({ success: false, message: "Academic record not found" });
    }

    record.grades.push({ subject, score });
    await record.save();

    res.status(200).json({ success: true, message: "Grade added successfully", data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding grade", error: error.message });
  }
};

// Add an achievement to an academic record
const addAchievementToAcademicRecord = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { achievement } = req.body;

    const record = await AcademicRecord.findOne({ studentId });

    if (!record) {
      return res.status(404).json({ success: false, message: "Academic record not found" });
    }

    record.achievements.push(achievement);
    await record.save();

    res.status(200).json({ success: true, message: "Achievement added successfully", data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding achievement", error: error.message });
  }
};

// Add a transcript to an academic record
const addTranscriptToAcademicRecord = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { transcript } = req.body;

    const record = await AcademicRecord.findOne({ studentId });

    if (!record) {
      return res.status(404).json({ success: false, message: "Academic record not found" });
    }

    record.transcripts.push(transcript);
    await record.save();

    res.status(200).json({ success: true, message: "Transcript added successfully", data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding transcript", error: error.message });
  }
};

// Delete an academic record
const deleteAcademicRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await AcademicRecord.findByIdAndDelete(id);
    if (!record) {
      return res.status(404).json({ success: false, message: "Academic record not found" });
    }

    res.status(200).json({ success: true, message: "Academic record deleted" });
  } catch (error) {
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
