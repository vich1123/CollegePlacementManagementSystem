import axios from "axios";

const BASE_URL = "http://localhost:5001/api";

// Fetch all companies
export const getCompanies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/companies`);
    return response.data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
};

// Create a new company
export const createCompany = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/companies`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
};

// Create a new student
export const createStudent = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/students`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

// Create a new placement drive
export const createPlacementDrive = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/placements`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating placement drive:", error);
    throw error;
  }
};

// Fetch recruitment status
export const fetchRecruitmentStatus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/recruitment-status`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recruitment status:", error);
    throw error;
  }
};
