const Student = require("../models/Student");
const Application = require("../models/Application");
const AcademicRecord = require("../models/AcademicRecord"); 
const mongoose = require("mongoose");

// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ success: false, message: "Error fetching students", error: error.message });
  }
};

// Fetch a single student by ID
const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id.trim();

    if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
      console.error("Invalid student ID format:", studentId);
      return res.status(400).json({ success: false, message: "Invalid student ID format." });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      console.error("Student not found with ID:", studentId);
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    const latestApplication = await Application.findOne({ studentId })
      .sort({ createdAt: -1 })
      .select("status jobTitle companyId createdAt");

    const academicRecord = await AcademicRecord.findOne({ studentId }).select("grades achievements transcripts lastUpdated");

    res.status(200).json({
      success: true,
      data: {
        student,
        latestApplication: latestApplication || "No applications found",
        academicRecord: academicRecord || "No academic records found",
      },
    });
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ success: false, message: "Error fetching student details", error: error.message });
  }
};

// Export functions
module.exports = {
  getStudents,
  getStudentById,
};
