import axios from 'axios';

const API_URL = '/api/reports';

export const getReports = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createReport = async (reportData) => {
  const response = await axios.post(API_URL, reportData);
  return response.data;
};
