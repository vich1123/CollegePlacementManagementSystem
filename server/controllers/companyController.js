const Company = require("../models/Company");
const Application = require("../models/application");
const mongoose = require("mongoose");

// ** Validate MongoDB ObjectId **
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// ** Fetch all companies **
const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate("jobPostings");
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

// ** Fetch company by name (Fix for Interview Scheduler) **
const getCompanyByName = async (req, res) => {
  try {
    let { companyName } = req.params;
    if (!companyName || companyName.trim() === "") {
      return res.status(400).json({ success: false, message: "Company name is required." });
    }

    companyName = companyName.trim().toLowerCase();

    const company = await Company.findOne({ name: new RegExp(`^${companyName}$`, "i") });

    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found." });
    }

    res.status(200).json({
      success: true,
      company: {
        id: company._id,
        name: company.name,
      },
    });
  } catch (error) {
    console.error("Error fetching company by name:", error);
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

    const applications = await Application.find({ company: companyId }).populate("student", "name email");
    
    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    console.error("Error fetching company applications:", error);
    res.status(500).json({ success: false, message: "Error fetching applications", error: error.message });
  }
};

// ** Add a new company **
const addCompany = async (req, res) => {
  try {
    const { name, contactEmail } = req.body;

    if (!name || !contactEmail) {
      return res.status(400).json({ success: false, message: "Company name and contact email are required." });
    }

    const existingCompany = await Company.findOne({ name: name.trim() });
    if (existingCompany) {
      return res.status(400).json({ success: false, message: "Company with this name already exists." });
    }

    const newCompany = new Company(req.body);
    await newCompany.save();

    res.status(201).json({ success: true, message: "Company added successfully.", data: newCompany });
  } catch (error) {
    console.error("Error adding company:", error);
    res.status(500).json({ success: false, message: "Error adding company", error: error.message });
  }
};

// ** Update company details **
const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid company ID format." });
    }

    const updatedCompany = await Company.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCompany) {
      return res.status(404).json({ success: false, message: "Company not found." });
    }

    res.status(200).json({ success: true, message: "Company updated successfully.", data: updatedCompany });
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({ success: false, message: "Error updating company", error: error.message });
  }
};

// ** Delete a company **
const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid company ID format." });
    }

    const deletedCompany = await Company.findByIdAndDelete(id);
    if (!deletedCompany) {
      return res.status(404).json({ success: false, message: "Company not found." });
    }

    res.status(200).json({ success: true, message: "Company deleted successfully." });
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({ success: false, message: "Error deleting company", error: error.message });
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

    if (!status) {
      return res.status(400).json({ success: false, message: "Application status is required." });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      { status, feedback, communicationMessage },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }

    res.status(200).json({ success: true, message: "Application reviewed successfully.", data: updatedApplication });
  } catch (error) {
    console.error("Error reviewing application:", error);
    res.status(500).json({ success: false, message: "Error reviewing application", error: error.message });
  }
};

// ** Export functions correctly **
module.exports = {
  getCompanies,
  getCompanyById,
  getCompanyByName,
  getCompanyApplications,
  addCompany,
  updateCompany,
  deleteCompany,
  reviewApplication
};
