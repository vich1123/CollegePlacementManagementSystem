const express = require('express');
const router = express.Router();
const academicRecordsController = require('../controllers/academicRecordsController');

// Fetch all academic records
router.get('/', academicRecordsController.getAcademicRecords);

// Fetch academic record for a specific student
router.get('/:studentId', academicRecordsController.getAcademicRecordByStudent);

// Add or update academic record
router.post('/', academicRecordsController.addOrUpdateAcademicRecord);

// Update specific fields of academic record
router.put('/:studentId', academicRecordsController.updateAcademicRecord);

// Delete an academic record by ID
router.delete('/:id', academicRecordsController.deleteAcademicRecord);

module.exports = router;
