import axios from "axios";

const API_URL = "http://localhost:5001/api/recruitment-status";

export const fetchRecruitmentStatus = async () => {
  const response = await axios.get(API_URL);
  return response.data.data;
};

export const createRecruitmentStatus = async (status) => {
  const response = await axios.post(API_URL, status);
  return response.data.data;
};
