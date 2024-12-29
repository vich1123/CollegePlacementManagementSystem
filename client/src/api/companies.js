import axios from 'axios';

// Create an Axios instance with the base URL
const API = axios.create({ baseURL: 'http://localhost:5001/api' });

// Fetch all companies
export const fetchCompanies = async () => {
  try {
    const response = await API.get('/companies');
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error fetching companies:', error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

// Add a new company
export const createCompany = async (newCompany) => {
  try {
    const response = await API.post('/companies', newCompany);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error creating company:', error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};
