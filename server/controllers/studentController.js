const Student = require("../models/Student");
const Application = require("../models/Application");
const AcademicRecord = require("../models/academicRecord");
const mongoose = require("mongoose");

// ** Validate MongoDB ObjectId **
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// ** Get all students **
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ success: false, message: "Error fetching students", error: error.message });
  }
};

// ** Fetch a single student by ID **
const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id.trim();

    if (!isValidObjectId(studentId)) {
      return res.status(400).json({ success: false, message: "Invalid student ID format." });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    const latestApplication = await Application.findOne({ student: studentId })
      .sort({ createdAt: -1 })
      .select("status jobTitle company createdAt")
      .populate("company", "name");

    const academicRecord = await AcademicRecord.findOne({ student: studentId })
      .select("grades achievements transcripts lastUpdated");

    res.status(200).json({
      success: true,
      data: {
        student,
        latestApplication: latestApplication || null,
        academicRecord: academicRecord || null,
      },
    });
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ success: false, message: "Error fetching student details", error: error.message });
  }
};

// ** Export functions **
module.exports = {
  getStudents,
  getStudentById
};
