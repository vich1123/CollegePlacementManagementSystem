const Company = require("../models/Company");

// Fetch all companies
const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies", error: error.message });
  }
};

// Add a new company
const addCompany = async (req, res) => {
  const { name, jobPostings } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Company name is required!" });
  }

  try {
    const newCompany = new Company({ name, jobPostings });
    await newCompany.save();
    res.status(201).json({ message: "Company added successfully!", company: newCompany });
  } catch (error) {
    res.status(500).json({ message: "Error adding company", error: error.message });
  }
};

module.exports = { getCompanies, addCompany }; // Ensure proper exports
