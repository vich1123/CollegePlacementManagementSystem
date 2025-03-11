import axios from 'axios';

const API_URL = '/api/notifications';

export const sendNotification = async (email, message) => {
  const response = await axios.post(`${API_URL}/send`, { email, message });
  return response.data;
};
