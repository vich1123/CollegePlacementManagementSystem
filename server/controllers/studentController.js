const Student = require("../models/Student");
const Application = require("../models/application");
const AcademicRecord = require("../models/academicRecord");
const mongoose = require("mongoose");

// Validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id) && /^[0-9a-fA-F]{24}$/.test(id);

// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find().lean();

    if (!students.length) {
      return res.status(404).json({ success: false, message: "No students found in the database." });
    }

    res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ success: false, message: "Error fetching students", error: error.message });
  }
};

// Get student by email
const getStudentByEmail = async (req, res) => {
  try {
    let { email } = req.params;
    email = email.trim().toLowerCase();

    if (!email.includes("@")) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    const student = await Student.findOne({ email: new RegExp(`^${email}$`, "i") }).lean();

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    res.status(200).json({
      success: true,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
      },
    });
  } catch (error) {
    console.error("Error fetching student by email:", error);
    res.status(500).json({ success: false, message: "Error fetching student", error: error.message });
  }
};

// Fetch a single student by ID
const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id.trim();

    console.log(`Fetching Student ID: ${studentId}`);

    if (!isValidObjectId(studentId)) {
      console.error(`Invalid student ID format received: ${studentId}`);
      return res.status(400).json({ success: false, message: "Invalid student ID format." });
    }

    const student = await Student.findById(studentId).lean();
    if (!student) {
      console.warn(`Student with ID ${studentId} not found.`);
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    console.log(`Student found: ${student.name} (${student.email})`);

    // Fetch all applications for the student
    const applications = await Application.find({ student: studentId })
      .populate("company", "name")
      .select("jobTitle status company createdAt")
      .lean();

    // Fetch academic record
    const academicRecord = await AcademicRecord.findOne({ studentId })
      .select("grades achievements transcripts")
      .lean();

    res.status(200).json({
      success: true,
      data: {
        student,
        applications: applications || [],
        academicRecord: academicRecord || null,
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
  getStudentByEmail,
  getStudentById,
};
