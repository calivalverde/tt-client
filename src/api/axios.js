
import axios from 'axios';

// This is where you would configure your backend URL
const API_URL = 'https://your-backend-api.com/api'; // Replace with your actual backend URL

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
