import axios from "axios";

const API_URL = "/api/notifications";

// Send interview notification
export const sendInterviewNotification = async (email, interviewDetails) => {
  try {
    const response = await axios.post(`${API_URL}/interview`, {
      email,
      ...interviewDetails,
    });

    return response.data;
  } catch (error) {
    console.error("Error sending interview notification:", error);
    throw error;
  }
};
