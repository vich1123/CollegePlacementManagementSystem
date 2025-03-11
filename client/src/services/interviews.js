import axios from 'axios';

const API_URL = '/api/interviews';

export const getInterviews = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const generateMeetingLink = async (interviewId) => {
  const response = await axios.get(`${API_URL}/${interviewId}/generate-link`);
  return response.data;
};
