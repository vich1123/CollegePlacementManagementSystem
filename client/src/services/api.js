import axios from 'axios';

// Axios instance with deployed backend URL
const API = axios.create({
  baseURL: 'https://collegeplacementmanagementsystem-1.onrender.com/api', // Replace with your deployed backend URL
});

export default API;

// Students API
export const addStudent = async (studentData) => {
  try {
    const response = await API.post('/students', studentData);
    return response.data;
  } catch (error) {
    console.error('Error adding student:', error.message);
    throw error;
  }
};

// Companies API
export const addCompany = async (companyData) => {
  try {
    const response = await API.post('/companies', companyData);
    return response.data;
  } catch (error) {
    console.error('Error adding company:', error.message);
    throw error;
  }
};

// Placement Drives API
export const fetchPlacementDrives = async () => {
  try {
    const response = await API.get('/placements');
    return response.data;
  } catch (error) {
    console.error('Error fetching placement drives:', error.message);
    throw error;
  }
};

export const addPlacementDrive = async (placementData) => {
  try {
    const response = await API.post('/placements', placementData);
    return response.data;
  } catch (error) {
    console.error('Error adding placement drive:', error.message);
    throw error;
  }
};

// Recruitment Status API
export const fetchRecruitmentStatus = async () => {
  try {
    const response = await API.get('/recruitment-status');
    return response.data;
  } catch (error) {
    console.error('Error fetching recruitment status:', error.message);
    throw error;
  }
};
