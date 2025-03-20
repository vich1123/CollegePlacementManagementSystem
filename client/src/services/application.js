import axios from "axios";

const API_BASE_URL = "/api/applications";

// Submit a new job application
export const submitApplication = async (studentId, companyId, jobTitle, coverLetter, resumeFile) => {
  try {
    const formData = new FormData();
    formData.append("studentId", studentId);
    formData.append("companyId", companyId);
    formData.append("jobTitle", jobTitle);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resumeFile);

    const response = await axios.post(API_BASE_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error submitting application:", error);
    throw error;
  }
};

// Get all job applications (Admin view)
export const getAllApplications = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};

// Get application by ID
export const getApplicationById = async (applicationId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${applicationId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching application:", error);
    throw error;
  }
};

// Get applications by student ID (Application tracking & status)
export const getApplicationsByStudent = async (studentId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/student/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching student applications:", error);
    throw error;
  }
};

// Get applications for a specific company
export const getApplicationsByCompany = async (companyId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/company/${companyId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching company applications:", error);
    throw error;
  }
};

// Update application status, feedback, and communication messages
export const updateApplicationStatus = async (applicationId, status, feedback, communicationMessage) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${applicationId}`, {
      status,
      feedback,
      communicationMessage,
    });

    return response.data;
  } catch (error) {
    console.error("Error updating application status:", error);
    throw error;
  }
};

// Delete an application
export const deleteApplication = async (applicationId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${applicationId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting application:", error);
    throw error;
  }
};
