const Company = require("../models/Company");
const Application = require("../models/Application");
const Student = require("../models/Student");
const mongoose = require("mongoose");
const fs = require("fs");
const csvParser = require("csv-parser");

// ** Validate MongoDB Object ID **
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// ** Fetch all companies **
const getCompanies = async (req, res) => {
  try {
    const { search, industry, location } = req.query;
    let filter = {};

    if (search) filter.name = { $regex: search, $options: "i" };
    if (industry) filter.industry = industry;
    if (location) filter.location = location;

    const companies = await Company.find(filter);

    if (!companies.length) {
      return res.status(404).json({ success: false, message: "No companies found." });
    }

    res.status(200).json({ success: true, data: companies });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ success: false, message: "Error fetching companies", error: error.message });
  }
};

// ** Fetch a single company by ID **
const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid company ID format." });
    }

    const company = await Company.findById(id).populate("jobPostings");
    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found." });
    }

    res.status(200).json({ success: true, data: company });
  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({ success: false, message: "Error fetching company", error: error.message });
  }
};

// ** Fetch all applications for a company **
const getCompanyApplications = async (req, res) => {
  try {
    const { companyId } = req.params;
    if (!isValidObjectId(companyId)) {
      return res.status(400).json({ success: false, message: "Invalid company ID format." });
    }

    const applications = await Application.find({ companyId })
      .populate("studentId", "name email")
      .sort({ createdAt: -1 });

    if (!applications.length) {
      return res.status(404).json({ success: false, message: "No applications found for this company." });
    }

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    console.error("Error fetching company applications:", error);
    res.status(500).json({ success: false, message: "Error fetching company applications", error: error.message });
  }
};

// ** Review an application **
const reviewApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, feedback, communicationMessage } = req.body;

    if (!isValidObjectId(applicationId)) {
      return res.status(400).json({ success: false, message: "Invalid application ID format." });
    }

    if (!["Accepted", "Rejected", "On-Hold", "Under Review"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value." });
    }

    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status, feedback, communicationMessage },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }

    // Notify student
    const student = await Student.findById(application.studentId);
    if (student) {
      console.log(`Notification: Sent email to ${student.email} regarding application status update.`);
    }

    res.status(200).json({ success: true, message: "Application reviewed successfully!", data: application });
  } catch (error) {
    console.error("Error reviewing application:", error);
    res.status(500).json({ success: false, message: "Error reviewing application", error: error.message });
  }
};

// ** Export company data **
const exportCompanies = async (req, res) => {
  try {
    const format = req.query.format || "json";
    const companies = await Company.find();

    if (!companies.length) {
      return res.status(404).json({ success: false, message: "No company data available to export." });
    }

    if (format === "json") {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Content-Disposition", "attachment; filename=companies.json");
      return res.status(200).json({ success: true, data: companies });
    } else if (format === "csv") {
      let csvContent = "Company Name,Job Postings,Contact Email,Website\n";
      companies.forEach((company) => {
        csvContent += `"${company.name}","${company.jobPostings?.join(", ")}","${company.contactEmail}","${company.website || ''}"\n`;
      });

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=companies.csv");
      return res.status(200).send(csvContent);
    } else {
      return res.status(400).json({ success: false, message: "Invalid format specified. Use 'json' or 'csv'." });
    }
  } catch (error) {
    console.error("Error exporting companies:", error);
    res.status(500).json({ success: false, message: "Error exporting company data", error: error.message });
  }
};

// ** Add a new company **
const addCompany = async (req, res) => {
  try {
    let { name, description, contactEmail, jobPostings, location, industry, website } = req.body;

    if (!name || !contactEmail) {
      return res.status(400).json({ success: false, message: "Company name and contact email are required!" });
    }

    const existingCompany = await Company.findOne({ $or: [{ name }, { contactEmail }] });

    if (existingCompany) {
      return res.status(400).json({ success: false, message: "A company with this name or email already exists." });
    }

    const newCompany = new Company({
      name,
      description: description || "No description available",
      contactEmail,
      jobPostings: Array.isArray(jobPostings) ? jobPostings : [],
      location: location || "Not provided",
      industry: industry || "Not specified",
      website: website || "",
    });

    await newCompany.save();
    res.status(201).json({ success: true, message: "Company added successfully!", data: newCompany });
  } catch (error) {
    console.error("Error adding company:", error);
    res.status(500).json({ success: false, message: "Error adding company", error: error.message });
  }
};

// ** Delete a company **
const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid company ID format." });
    }

    const company = await Company.findByIdAndDelete(id);
    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found." });
    }

    res.status(200).json({ success: true, message: "Company deleted successfully!" });
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({ success: false, message: "Error deleting company", error: error.message });
  }
};

// ** Export all functions (No functions removed) **
module.exports = {
  getCompanies,
  getCompanyById,
  getCompanyApplications,
  reviewApplication,
  exportCompanies,
  addCompany, 
  deleteCompany,
};