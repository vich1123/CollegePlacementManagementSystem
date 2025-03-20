import axios from "axios";

// Base API URL
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

// Fetch all companies with optional filters
export const getCompanies = async (queryParams = "") => {
  try {
    const response = await axios.get(`${API_URL}/companies?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching companies:", error.response?.data || error.message);
    throw new Error("Failed to fetch companies. Please try again later.");
  }
};

// Fetch a single company by ID
export const getCompanyById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/companies/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching company:", error.response?.data || error.message);
    throw new Error("Failed to fetch company details.");
  }
};

// Add a new company
export const createCompany = async (newCompany) => {
  try {
    if (!newCompany || !newCompany.name || !newCompany.jobPostings) {
      throw new Error("Invalid company data provided.");
    }
    const response = await axios.post(`${API_URL}/companies`, newCompany);
    return response.data;
  } catch (error) {
    console.error("Error creating company:", error.response?.data || error.message);
    throw new Error("Failed to create company. Please try again later.");
  }
};

// Apply for a job in a company
export const applyForJob = async (companyId, jobTitle) => {
  try {
    const response = await axios.post(`${API_URL}/applications`, { companyId, jobTitle });
    return response.data;
  } catch (error) {
    console.error("Error applying for job:", error.response?.data || error.message);
    throw new Error("Failed to apply for the job.");
  }
};
