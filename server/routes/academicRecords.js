const express = require("express");
const router = express.Router();
const academicRecordsController = require("../controllers/academicRecordsController");

// Middleware to validate MongoDB ObjectId
const validateObjectId = (req, res, next) => {
  const { studentId, id } = req.params;
  const isValidMongoId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

  if (studentId && !isValidMongoId(studentId)) {
    return res.status(400).json({ success: false, message: "Invalid student ID format." });
  }
  if (id && !isValidMongoId(id)) {
    return res.status(400).json({ success: false, message: "Invalid academic record ID format." });
  }
  next();
};

// Fetch all academic records
router.get("/", academicRecordsController.getAcademicRecords);

// Fetch academic record for a specific student
router.get("/:studentId", validateObjectId, academicRecordsController.getAcademicRecordByStudent);

// Add or update an academic record (Ensures record exists)
router.post("/", academicRecordsController.addOrUpdateAcademicRecord);

// Update specific fields of academic record (Uses PATCH for partial update)
router.patch("/:studentId", validateObjectId, academicRecordsController.updateAcademicRecord);

// Add a new grade to a student's academic record
router.patch("/:studentId/add-grade", validateObjectId, academicRecordsController.addGradeToAcademicRecord);

// Add a new achievement to a student's academic record
router.patch("/:studentId/add-achievement", validateObjectId, academicRecordsController.addAchievementToAcademicRecord);

// Add a new transcript to a student's academic record
router.patch("/:studentId/add-transcript", validateObjectId, academicRecordsController.addTranscriptToAcademicRecord);

// Delete an academic record by ID
router.delete("/:id", validateObjectId, academicRecordsController.deleteAcademicRecord);

module.exports = router;
