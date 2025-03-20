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

// ** MongoDB Object ID Validation **
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id?.trim() ?? "");

// ** Students API **
export const getStudents = async () => apiCall("GET", "/students");

export const getStudentById = async (id) => {
  if (!isValidObjectId(id)) {
    return { success: false, message: "Invalid student ID format." };
  }
  return apiCall("GET", `/students/${id.trim()}`);
};

export const getStudentByEmail = async (email) => {
  if (!email || !email.includes("@")) {
    return { success: false, message: "Invalid email format." };
  }
  return apiCall("GET", `/students/email/${encodeURIComponent(email)}`);
};

export const createStudent = async (data) => apiCall("POST", "/students", data);

export const updateStudent = async (id, data) => {
  if (!isValidObjectId(id)) {
    return { success: false, message: "Invalid student ID format." };
  }
  return apiCall("PUT", `/students/${id.trim()}`, data);
};

export const deleteStudent = async (id) => {
  if (!isValidObjectId(id)) {
    return { success: false, message: "Invalid student ID format." };
  }
  return apiCall("DELETE", `/students/${id.trim()}`);
};

// ** Companies API **
export const getCompanies = async () => apiCall("GET", "/companies");

export const getCompanyById = async (id) => {
  if (!isValidObjectId(id)) {
    return { success: false, message: "Invalid company ID format." };
  }
  return apiCall("GET", `/companies/${id.trim()}`);
};

export const getCompanyByName = async (name) => {
  if (!name) {
    return { success: false, message: "Company name is required." };
  }
  return apiCall("GET", `/companies/name/${encodeURIComponent(name)}`);
};

export const createCompany = async (data) => {
  if (!data.name || !data.contactEmail) {
    return { success: false, message: "Company name and contact email are required." };
  }
  return apiCall("POST", "/companies", data);
};

export const updateCompany = async (id, data) => {
  if (!isValidObjectId(id)) {
    return { success: false, message: "Invalid company ID format." };
  }
  return apiCall("PUT", `/companies/${id.trim()}`, data);
};

export const deleteCompany = async (id) => {
  if (!isValidObjectId(id)) {
    return { success: false, message: "Invalid company ID format." };
  }
  return apiCall("DELETE", `/companies/${id.trim()}`);
};

// ** Jobs API **
export const getJobs = async () => apiCall("GET", "/jobs");

export const createJob = async (data) => {
  if (!data.title || !data.companyId) {
    return { success: false, message: "Job title and company ID are required." };
  }
  return apiCall("POST", "/jobs", data);
};

export const getJobById = async (id) => {
  if (!isValidObjectId(id)) {
    return { success: false, message: "Invalid job ID format." };
  }
  return apiCall("GET", `/jobs/${id.trim()}`);
};

export const deleteJob = async (id) => {
  if (!isValidObjectId(id)) {
    return { success: false, message: "Invalid job ID format." };
  }
  return apiCall("DELETE", `/jobs/${id.trim()}`);
};

// ** Placement Drive API **
export const getPlacements = async () => apiCall("GET", "/placements");

export const createPlacementDrive = async (data) => apiCall("POST", "/placements", data);

// ** Recruitment Status API **
export const fetchRecruitmentStatusHistory = async () => apiCall("GET", "/recruitment-status/history");

export const fetchLatestRecruitmentStatus = async () => apiCall("GET", "/recruitment-status/latest");

export const createRecruitmentStatus = async (data) => apiCall("POST", "/recruitment-status", data);

export const deleteRecruitmentStatusById = async (id) => {
  if (!isValidObjectId(id)) {
    return { success: false, message: "Invalid recruitment status ID format." };
  }
  return apiCall("DELETE", `/recruitment-status/${id.trim()}`);
};

export const deleteAllRecruitmentStatuses = async () => apiCall("DELETE", "/recruitment-status");

// ** Reports API **
export const getReports = async () => apiCall("GET", "/reports");

// ** Company Applications API **
export const getCompanyApplications = async (companyId) => {
  if (!isValidObjectId(companyId)) {
    return { success: false, message: "Invalid company ID format." };
  }
  return apiCall("GET", `/companies/${companyId.trim()}/applications`);
};

// ** Interview Scheduling API **
export const scheduleInterview = async (data) => {
  if (!data.studentId || !data.companyId || !data.jobTitle || !data.date || !data.time) {
    return { success: false, message: "All required fields must be filled." };
  }
  return apiCall("POST", "/interviews/schedule", data);
};

// ** Interview Notification API **
export const sendInterviewNotification = async (data) => {
  if (!data.email || !data.interviewDate || !data.interviewTime || !data.companyName || !data.jobTitle) {
    return { success: false, message: "Missing required notification details." };
  }
  return apiCall("POST", "/notifications/interview", data);
};

// ** Application Review API - Fixed Route **
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

// ** Academic Record API **
export const getAcademicRecordByStudent = async (studentId) => {
  if (!isValidObjectId(studentId)) {
    return { success: false, message: "Invalid student ID format." };
  }
  return apiCall("GET", `/students/${studentId.trim()}/academic-record`);
};
