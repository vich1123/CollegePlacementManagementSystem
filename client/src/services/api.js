import axios from "axios";

// Base URL Configuration (Handles Dev & Production)
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/api"
    : "https://collegeplacementmanagementsystem-1.onrender.com/api";

// Debugging Function for API Calls
const logRequest = (method, url, data = null) => {
  console.log(`API Request → Method: ${method}, URL: ${url}, Data:`, data);
};

// Centralized API Request Helper Function
const apiCall = async (method, endpoint, data = null, config = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  logRequest(method, url, data);

  try {
    const response = await axios({
      method,
      url,
      data,
      withCredentials: true, // Ensures authentication & cookies handling
      ...config,
    });

    console.log(`API Response → ${method}: ${url}`, response.data);
    return response.data ?? { success: false, message: "Invalid API response." };
  } catch (error) {
    console.error(`Error in ${method} request to ${url}:`, error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "API request failed.",
      error: error.response?.data || error.message,
    };
  }
};

// MongoDB Object ID Validation
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id?.trim() ?? "");

// Students API
export const getStudents = async () => apiCall("GET", "/students");

export const getStudentById = async (id) =>
  isValidObjectId(id) ? apiCall("GET", `/students/${id.trim()}`) : { success: false, message: "Invalid ID format." };

export const createStudent = async (data) => apiCall("POST", "/students", data);

export const updateStudent = async (id, data) =>
  isValidObjectId(id) ? apiCall("PUT", `/students/${id.trim()}`, data) : { success: false, message: "Invalid ID format." };

export const deleteStudent = async (id) =>
  isValidObjectId(id) ? apiCall("DELETE", `/students/${id.trim()}`) : { success: false, message: "Invalid ID format." };

// Companies API
export const getCompanies = async () => apiCall("GET", "/companies");

export const createCompany = async (data) => {
  if (!data.name || !data.contactEmail) {
    return { success: false, message: "Company name and contact email are required." };
  }
  return apiCall("POST", "/companies", data);
};

export const updateCompany = async (id, data) =>
  isValidObjectId(id) ? apiCall("PUT", `/companies/${id.trim()}`, data) : { success: false, message: "Invalid ID format." };

export const deleteCompany = async (id) =>
  isValidObjectId(id) ? apiCall("DELETE", `/companies/${id.trim()}`) : { success: false, message: "Invalid ID format." };

// Jobs API
export const getJobs = async () => apiCall("GET", "/jobs");

export const createJob = async (data) => {
  if (!data.title || !data.companyId) {
    return { success: false, message: "Job title and company ID are required." };
  }
  return apiCall("POST", "/jobs", data);
};

export const getJobById = async (id) =>
  isValidObjectId(id) ? apiCall("GET", `/jobs/${id.trim()}`) : { success: false, message: "Invalid ID format." };

export const deleteJob = async (id) =>
  isValidObjectId(id) ? apiCall("DELETE", `/jobs/${id.trim()}`) : { success: false, message: "Invalid ID format." };

// Placement Drive API
export const getPlacements = async () => apiCall("GET", "/placements");

export const createPlacementDrive = async (data) => apiCall("POST", "/placements", data);

// Recruitment Status API
export const fetchRecruitmentStatusHistory = async () => apiCall("GET", "/recruitment-status/history");

export const fetchLatestRecruitmentStatus = async () => apiCall("GET", "/recruitment-status/latest");

export const createRecruitmentStatus = async (data) => apiCall("POST", "/recruitment-status", data);

export const deleteRecruitmentStatusById = async (id) =>
  isValidObjectId(id) ? apiCall("DELETE", `/recruitment-status/${id.trim()}`) : { success: false, message: "Invalid ID format." };

export const deleteAllRecruitmentStatuses = async () => apiCall("DELETE", "/recruitment-status");

// Reports API
export const getReports = async () => apiCall("GET", "/reports");

// Company Applications API
export const getCompanyApplications = async (companyId) =>
  isValidObjectId(companyId) ? apiCall("GET", `/companies/${companyId.trim()}/applications`) : { success: false, message: "Invalid ID format." };

// Application Review API - Fixed Route
export const reviewApplication = async (companyId, applicationId, { status, feedback, communicationMessage }) => {
  if (!isValidObjectId(companyId) || !isValidObjectId(applicationId)) {
    return { success: false, message: "Invalid company or application ID format." };
  }
  return apiCall("PUT", `/companies/${companyId.trim()}/applications/${applicationId.trim()}/review`, {
    status,
    feedback,
    communicationMessage,
  });
};

// Academic Record API
export const getAcademicRecordByStudent = async (studentId) =>
  isValidObjectId(studentId) ? apiCall("GET", `/students/${studentId.trim()}/academic-record`) : { success: false, message: "Invalid ID format." };

