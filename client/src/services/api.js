import axios from "axios";

// Base URL Configuration
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/api"
    : "https://collegeplacementmanagementsystem-1.onrender.com/api";

// Debugging function
const logRequest = (method, url, data = null) => {
  console.log(`API Request → Method: ${method}, URL: ${url}, Data:`, data);
};

// Helper function for API requests
const apiCall = async (method, endpoint, data = null, config = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  logRequest(method, url, data);

  try {
    const response = await axios({ method, url, data, ...config });
    console.log(`API Response → ${method}: ${url}`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error in ${method} request to ${url}:`, error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "API request failed.",
      error: error.response?.data || error.message,
    };
  }
};

// Helper function to validate MongoDB Object ID
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// **Student API**
export const getStudents = () => apiCall("GET", "/students");
export const getStudentById = (id) => {
  if (!isValidObjectId(id)) return Promise.resolve({ success: false, message: "Invalid student ID format." });
  return apiCall("GET", `/students/${id}`);
};
export const createStudent = (data) => apiCall("POST", "/students", data);
export const updateStudent = (id, data) => {
  if (!isValidObjectId(id)) return Promise.resolve({ success: false, message: "Invalid ID." });
  return apiCall("PUT", `/students/${id}`, data);
};
export const deleteStudent = (id) => {
  if (!isValidObjectId(id)) return Promise.resolve({ success: false, message: "Invalid ID." });
  return apiCall("DELETE", `/students/${id}`);
};

// **Job API (Fixed)**
export const getJobs = () => apiCall("GET", "/jobs");
export const createJob = (data) => apiCall("POST", "/jobs", data);
export const getJobById = (id) => {
  if (!isValidObjectId(id)) return Promise.resolve({ success: false, message: "Invalid job ID format." });
  return apiCall("GET", `/jobs/${id}`);
};
export const deleteJob = (id) => {
  if (!isValidObjectId(id)) return Promise.resolve({ success: false, message: "Invalid job ID format." });
  return apiCall("DELETE", `/jobs/${id}`);
};

// **Placement Drive API**
export const getPlacements = () => apiCall("GET", "/placements");
export const createPlacementDrive = (data) => apiCall("POST", "/placements", data);

// **Recruitment Status API**
export const fetchRecruitmentStatusHistory = () => apiCall("GET", "/recruitment-status/history");
export const fetchLatestRecruitmentStatus = () => apiCall("GET", "/recruitment-status/latest");
export const createRecruitmentStatus = (data) => apiCall("POST", "/recruitment-status", data);
export const deleteRecruitmentStatusById = (id) => {
  if (!isValidObjectId(id)) return Promise.resolve({ success: false, message: "Invalid recruitment status ID format." });
  return apiCall("DELETE", `/recruitment-status/${id}`);
};
export const deleteAllRecruitmentStatuses = () => apiCall("DELETE", "/recruitment-status");

// **Reports API**
export const fetchReports = () => apiCall("GET", "/reports");

// **Companies API**
export const getCompanies = () => apiCall("GET", "/companies");
export const createCompany = (data) => apiCall("POST", "/companies", data);
export const updateCompany = (id, data) => {
  if (!isValidObjectId(id)) return Promise.resolve({ success: false, message: "Invalid company ID." });
  return apiCall("PUT", `/companies/${id}`, data);
};
export const deleteCompany = (id) => {
  if (!isValidObjectId(id)) return Promise.resolve({ success: false, message: "Invalid company ID." });
  return apiCall("DELETE", `/companies/${id}`);
};

// **Company Applications API**
export const getCompanyApplications = (companyId) => {
  if (!isValidObjectId(companyId)) return Promise.resolve({ success: false, message: "Invalid company ID format." });
  return apiCall("GET", `/companies/${companyId}/applications`);
};

// **Application Review API**
export const reviewApplication = (applicationId, { status, feedback, communicationMessage }) => {
  if (!isValidObjectId(applicationId)) return Promise.resolve({ success: false, message: "Invalid application ID format." });
  return apiCall("PUT", `/applications/${applicationId}/review`, { status, feedback, communicationMessage });
};

// **Academic Record API**
export const getAcademicRecordByStudent = (studentId) => {
  if (!isValidObjectId(studentId)) return Promise.resolve({ success: false, message: "Invalid student ID format." });
  return apiCall("GET", `/students/${studentId}/academic-record`);
};
