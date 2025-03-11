const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { getStudents, getStudentById } = require("../controllers/studentController");

// Middleware to Validate MongoDB ObjectId
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  
  console.log("Checking student ID format:", id);
  
  if (!id || !mongoose.Types.ObjectId.isValid(id.trim())) {
    console.error("Invalid Student ID:", id);
    return res.status(400).json({ success: false, message: "Invalid student ID format." });
  }

  console.log("Valid Student ID:", id);
  next();
};

// Student Routes
router.get("/", getStudents);
router.get("/:id", validateObjectId, getStudentById);

module.exports = router;
