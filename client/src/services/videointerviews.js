import axios from 'axios';

const API_URL = '/api/videointerviews';

/**
 * Fetch all video interviews.
 * @returns {Promise<Object>} API response data containing video interviews.
 */
export const getVideoInterviews = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching video interviews:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetch a single video interview by ID.
 * @param {string} interviewId - The ID of the interview.
 * @returns {Promise<Object>} API response data containing interview details.
 */
export const getVideoInterviewById = async (interviewId) => {
  try {
    const response = await axios.get(`${API_URL}/${interviewId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching video interview:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Schedule a new video interview.
 * @param {Object} interviewData - Interview details.
 * @returns {Promise<Object>} API response data containing created interview.
 */
export const scheduleVideoInterview = async (interviewData) => {
  try {
    const response = await axios.post(`${API_URL}/schedule`, interviewData);
    return response.data;
  } catch (error) {
    console.error("Error scheduling video interview:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Generate a video meeting link for a scheduled interview.
 * @param {string} interviewId - The ID of the interview.
 * @returns {Promise<Object>} API response containing the generated link.
 */
export const generateMeetingLink = async (interviewId) => {
  try {
    const response = await axios.get(`${API_URL}/${interviewId}/generate-link`);
    return response.data;
  } catch (error) {
    console.error("Error generating meeting link:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Update an existing video interview.
 * @param {string} interviewId - The ID of the interview.
 * @param {Object} updatedData - Updated interview details.
 * @returns {Promise<Object>} API response data containing updated interview.
 */
export const updateVideoInterview = async (interviewId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${interviewId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating video interview:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Delete a video interview.
 * @param {string} interviewId - The ID of the interview to delete.
 * @returns {Promise<Object>} API response data confirming deletion.
 */
export const deleteVideoInterview = async (interviewId) => {
  try {
    const response = await axios.delete(`${API_URL}/${interviewId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting video interview:", error.response?.data || error.message);
    throw error;
  }
};
