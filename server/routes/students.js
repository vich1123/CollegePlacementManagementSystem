const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
  getStudents,
  getStudentById,
} = require("../controllers/studentController");

// Middleware to validate MongoDB ObjectId format
const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  console.log("API Request received for student ID:", id);
  console.log("Type of received ID:", typeof id);

  if (!id || typeof id !== "string") {
    console.error("Invalid ObjectId format: ID is missing or not a string", id);
    return res.status(400).json({ success: false, message: "Invalid student ID format." });
  }

  if (!mongoose.Types.ObjectId.isValid(id.trim())) {
    console.error("Invalid ObjectId format: Not a valid MongoDB ObjectId", id);
    return res.status(400).json({ success: false, message: "Invalid student ID format." });
  }

  console.log("Valid Student ID Passed:", id);
  next();
};

// Routes
router.get("/", getStudents);
router.get("/:id", validateObjectId, getStudentById);

module.exports = router;
