import axios from 'axios';

// Create an Axios instance with the base URL from the environment variable
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// Fetch all students
export const fetchStudents = async () => {
  try {
    const response = await API.get('/students');
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error fetching students:', error.response?.data || error.message);
    throw new Error('Failed to fetch students. Please try again later.');
  }
};

// Add a new student
export const createStudent = async (newStudent) => {
  try {
    if (!newStudent || !newStudent.name || !newStudent.email || !newStudent.course) {
      throw new Error('Invalid student data provided.');
    }
    const response = await API.post('/students', newStudent);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error creating student:', error.response?.data || error.message);
    throw new Error('Failed to create student. Please try again later.');
  }
};