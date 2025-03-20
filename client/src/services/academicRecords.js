import axios from "axios";

const API_URL = "/api/academicRecords";

// Fetch all academic records
export const getAcademicRecords = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching academic records:", error);
    throw error;
  }
};

// Fetch academic record by student ID
export const getAcademicRecordByStudent = async (studentId) => {
  try {
    const response = await axios.get(`${API_URL}/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching academic record:", error);
    throw error;
  }
};

// Add new academic record (admin or student can add)
export const addAcademicRecord = async (recordData) => {
  try {
    const response = await axios.post(API_URL, recordData);
    return response.data;
  } catch (error) {
    console.error("Error adding academic record:", error);
    throw error;
  }
};

// Update an existing academic record
export const updateAcademicRecord = async (studentId, updateData) => {
  try {
    const response = await axios.put(`${API_URL}/${studentId}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Error updating academic record:", error);
    throw error;
  }
};

// Delete an academic record
export const deleteAcademicRecord = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting academic record:", error);
    throw error;
  }
};
