import axios from 'axios';

// Create an Axios instance with the base URL from the environment variable
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// Fetch all companies
export const fetchCompanies = async () => {
  try {
    const response = await API.get('/companies');
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error fetching companies:', error.response?.data || error.message);
    throw new Error('Failed to fetch companies. Please try again later.');
  }
};

// Add a new company
export const createCompany = async (newCompany) => {
  try {
    if (!newCompany || !newCompany.name || !newCompany.jobPostings) {
      throw new Error('Invalid company data provided.');
    }
    const response = await API.post('/companies', newCompany);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error creating company:', error.response?.data || error.message);
    throw new Error('Failed to create company. Please try again later.');
  }
};