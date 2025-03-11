const AcademicRecord = require("../models/academicRecord"); // Ensure correct case

// Get all academic records
exports.getAcademicRecords = async (req, res) => {
  try {
    const records = await AcademicRecord.find().populate('studentId', 'name email');
    res.status(200).json({ success: true, data: records });
  } catch (err) {
    console.error("Error fetching academic records:", err);
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
  }
};

// Fetch academic record for a specific student
exports.getAcademicRecordByStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId?.trim();

    if (!studentId) {
      return res.status(400).json({ success: false, message: "Student ID is required." });
    }

    const record = await AcademicRecord.findOne({ studentId }).populate('studentId', 'name email');

    if (!record) {
      return res.status(404).json({ success: false, message: "Academic record not found for this student." });
    }

    res.status(200).json({ success: true, data: record });
  } catch (err) {
    console.error("Error fetching academic record:", err);
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
  }
};

// Add or update academic record
exports.addOrUpdateAcademicRecord = async (req, res) => {
  try {
    const { studentId, grades, achievements, transcripts } = req.body;

    if (!studentId) {
      return res.status(400).json({ success: false, message: "Student ID is required." });
    }

    const updatedRecord = await AcademicRecord.findOneAndUpdate(
      { studentId },
      { grades, achievements, transcripts, lastUpdated: Date.now() },
      { new: true, upsert: true } // Creates if doesn't exist, updates if it does
    );

    res.status(201).json({ success: true, message: "Academic record saved successfully!", data: updatedRecord });
  } catch (err) {
    console.error("Error saving academic record:", err);
    res.status(400).json({ success: false, message: "Error saving academic record", error: err.message });
  }
};

// Update only specific fields of academic record
exports.updateAcademicRecord = async (req, res) => {
  try {
    const studentId = req.params.studentId?.trim();

    if (!studentId) {
      return res.status(400).json({ success: false, message: "Student ID is required." });
    }

    const updateData = { ...req.body, lastUpdated: Date.now() };

    const updatedRecord = await AcademicRecord.findOneAndUpdate(
      { studentId },
      updateData,
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ success: false, message: "Academic record not found." });
    }

    res.status(200).json({ success: true, message: "Academic record updated!", data: updatedRecord });
  } catch (err) {
    console.error("Error updating academic record:", err);
    res.status(400).json({ success: false, message: "Error updating academic record", error: err.message });
  }
};

// Delete an academic record by ID
exports.deleteAcademicRecord = async (req, res) => {
  try {
    const record = await AcademicRecord.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: "Academic record not found." });
    }

    res.status(200).json({ success: true, message: "Academic record deleted successfully!" });
  } catch (err) {
    console.error("Error deleting academic record:", err);
    res.status(500).json({ success: false, message: "Error deleting academic record", error: err.message });
  }
};
