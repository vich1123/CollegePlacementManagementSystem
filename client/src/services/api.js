import axios from "axios";
const BASE_URL = "https://collegeplacementmanagementsystem-1.onrender.com/api";

// Debugging function to log API calls
const logRequest = (method, url, data = null) => {
  console.log(`API Request → Method: ${method}, URL: ${url}, Data:`, data);
};

// Fetch all companies
export const getCompanies = async () => {
  const url = `${BASE_URL}/companies`;
  logRequest("GET", url);
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching companies:", error.response?.data || error.message);
    throw error;
  }
};

// Create a new company
export const createCompany = async (data) => {
  const url = `${BASE_URL}/companies`;
  logRequest("POST", url, data);
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error creating company:", error.response?.data || error.message);
    throw error;
  }
};

// Create a new student
export const createStudent = async (data) => {
  const url = `${BASE_URL}/students`;
  logRequest("POST", url, data);
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error creating student:", error.response?.data || error.message);
    throw error;
  }
};

// Create a new placement drive
export const createPlacementDrive = async (data) => {
  const url = `${BASE_URL}/placements`;
  logRequest("POST", url, data);
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error creating placement drive:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch recruitment status
export const fetchRecruitmentStatus = async () => {
  const url = `${BASE_URL}/recruitment-status`;
  logRequest("GET", url);
  try {
    const response = await axios.get(url);
    console.log("Recruitment Status Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching recruitment status:", error.response?.data || error.message);
    throw error;
  }
};

// Create or update recruitment status
export const updateRecruitmentStatus = async (data) => {
  const url = `${BASE_URL}/recruitment-status`;
  logRequest("POST", url, data);
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error updating recruitment status:", error.response?.data || error.message);
    throw error;
  }
};

// Delete recruitment status
export const deleteRecruitmentStatus = async () => {
  const url = `${BASE_URL}/recruitment-status`;
  logRequest("DELETE", url);
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error deleting recruitment status:", error.response?.data || error.message);
    throw error;
  }
};
