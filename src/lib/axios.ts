import axios from 'axios';
import { API_BASE_URL } from '../constants/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//  Automatically attach access_token to all requests
axiosInstance.interceptors.request.use((config) => {
  if (config.url?.includes('/auth/login')) {
    return config; 
  }

  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
