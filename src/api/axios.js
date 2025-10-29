
import axios from 'axios';

// API base URL - configured via environment variables
// Development (.env.local): http://localhost:8088
// Production (.env.production): https://tt-sh-api-523762023440.us-central1.run.app
const API_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
