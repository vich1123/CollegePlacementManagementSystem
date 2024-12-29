const Student = require("../models/Student");

// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error: error.message });
  }
};

// Create a new student
const createStudent = async (req, res) => {
  const { name, email, resume, course } = req.body;

  // Validate request body
  if (!name || !email || !course) {
    return res.status(400).json({ message: "Name, email, and course are required!" });
  }

  try {
    const newStudent = new Student({ name, email, resume, course });
    await newStudent.save();
    res.status(201).json({ message: "Student added successfully!", student: newStudent });
  } catch (error) {
    res.status(500).json({ message: "Error adding student", error: error.message });
  }
};

// Update a student's details
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, resume, course } = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, email, resume, course },
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student updated successfully!", student: updatedStudent });
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error: error.message });
  }
};

// Delete a student
const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error: error.message });
  }
};

module.exports = {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};
