import axios from "axios";

const API_URL = "/api/reports";

// Fetch all placement reports
export const getReports = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error.response?.data || error.message);
    throw new Error("Failed to fetch reports. Please try again later.");
  }
};

// Create a new placement report
export const createReport = async (reportData) => {
  try {
    const response = await axios.post(API_URL, reportData);
    return response.data;
  } catch (error) {
    console.error("Error creating report:", error.response?.data || error.message);
    throw new Error("Failed to create report. Please try again later.");
  }
};
