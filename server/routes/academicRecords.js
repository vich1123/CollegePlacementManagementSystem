const express = require("express");
const router = express.Router();
const academicRecordsController = require("../controllers/academicRecordsController");

// Fetch all academic records
router.get("/", academicRecordsController.getAcademicRecords);

// Fetch academic record for a specific student
router.get("/:studentId", academicRecordsController.getAcademicRecordByStudent);

// Add or update an academic record (Ensures record exists)
router.post("/", academicRecordsController.addOrUpdateAcademicRecord);

// Update specific fields of academic record
router.put("/:studentId", academicRecordsController.updateAcademicRecord);

// Add a new grade to a student's academic record
router.put("/:studentId/add-grade", academicRecordsController.addGradeToAcademicRecord);

// Add a new achievement to a student's academic record
router.put("/:studentId/add-achievement", academicRecordsController.addAchievementToAcademicRecord);

// Add a new transcript to a student's academic record
router.put("/:studentId/add-transcript", academicRecordsController.addTranscriptToAcademicRecord);

// Delete an academic record by ID
router.delete("/:id", academicRecordsController.deleteAcademicRecord);

module.exports = router;
