import axios from 'axios';

const API_URL = '/api/academicRecords';

export const getAcademicRecords = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addAcademicRecord = async (recordData) => {
  const response = await axios.post(API_URL, recordData);
  return response.data;
};

export const deleteAcademicRecord = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
