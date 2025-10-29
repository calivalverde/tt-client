
import axios from 'axios';

// API base URL - defaults to local development server
// Can be overridden via VITE_API_BASE_URL environment variable
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8088';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
