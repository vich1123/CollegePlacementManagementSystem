import axios from "axios";

const BASE_URL = "http://localhost:5001/api/placements";

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
