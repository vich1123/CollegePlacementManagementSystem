import axios from "axios";

const BASE_URL = "https://collegeplacementmanagementsystem-1.onrender.com/api/placements";

// Function to create a new placement drive
export const createPlacementDrive = async (data) => {
  try {
    const response = await axios.post(BASE_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error creating placement drive:", error);
    throw error;
  }
};

// Function to fetch all placement drives
export const getPlacementDrives = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching placement drives:", error);
    throw error;
  }
};

// Function to update placement drive status
export const updatePlacementDriveStatus = async (id, status) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating placement drive status:", error);
    throw error;
  }
};

// Function to delete a placement drive
export const deletePlacementDrive = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting placement drive:", error);
    throw error;
  }
};
