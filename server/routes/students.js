const express = require("express");
const Student = require("../models/Student");
const mongoose = require("mongoose");

const router = express.Router();

// ** Validate MongoDB ObjectId **
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// ** Middleware for Debugging API Requests **
router.use((req, res, next) => {
  console.log(`Student API Request: ${req.method} ${req.originalUrl}`);
  next();
});

// ** Get all students **
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    if (!students.length) {
      return res.status(404).json({ success: false, message: "No students found." });
    }
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ success: false, message: "Error fetching students", error: error.message });
  }
});

// ** Get student by email (For Interview Scheduler) **
router.get("/email/:email", async (req, res) => {
  try {
    const decodedEmail = decodeURIComponent(req.params.email).toLowerCase();

    if (!decodedEmail.includes("@")) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    const student = await Student.findOne({ email: decodedEmail });

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    res.status(200).json({
      success: true,
      studentId: student._id, // Return only the ID as expected by the frontend
    });
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ success: false, message: "Error fetching student", error: error.message });
  }
});

// ** Get student by ID **
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: "Invalid student ID format." });
  }

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    res.status(500).json({ success: false, message: "Error fetching student details", error: error.message });
  }
});

// ** Handle invalid routes **
router.use((req, res) => {
  res.status(404).json({ success: false, message: "Invalid student API route." });
});

module.exports = router;
