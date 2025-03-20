const express = require("express");
const {
  getCompanies,
  getCompanyById,
  getCompanyApplications,
  reviewApplication,
  addCompany,
  updateCompany,
  deleteCompany
} = require("../controllers/companyController");

const router = express.Router();

// ** Middleware for Debugging API Requests **
router.use((req, res, next) => {
  console.log(`Company API Request: ${req.method} ${req.originalUrl}`);
  next();
});

// ** Define API Routes **
router.get("/", getCompanies);  // Fetch all companies
router.get("/:id", getCompanyById);  // Fetch a company by ID
router.get("/:companyId/applications", getCompanyApplications);  // Fetch applications for a company
router.put("/:companyId/applications/:applicationId/review", reviewApplication);  // Review an application
router.post("/", addCompany);  // Add a new company
router.put("/:id", updateCompany);  // Update company details
router.delete("/:id", deleteCompany);  // Delete a company

module.exports = router;
