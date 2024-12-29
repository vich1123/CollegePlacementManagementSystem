const express = require('express');
const { getCompanies, addCompany } = require('../controllers/companyController'); // Updated to match the export
const router = express.Router();

router.get('/', getCompanies);
router.post('/', addCompany); // Updated function reference

module.exports = router;
