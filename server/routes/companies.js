const express = require("express");
const {
  getCompanies,
  getCompanyById,
  getCompanyApplications,
  reviewApplication,
  exportCompanies,
  addCompany,
  deleteCompany,
} = require("../controllers/companyController");

const router = express.Router();

// Get all companies
router.get("/", getCompanies);

// Get a single company by ID
router.get("/:id", getCompanyById);

// Get all applications for a company
router.get("/:companyId/applications", getCompanyApplications);

// Review an application
router.put("/applications/:applicationId/review", reviewApplication);

router.get("/export", exportCompanies);

router.post("/", addCompany);

// Delete a company
router.delete("/:id", deleteCompany);

module.exports = router;
