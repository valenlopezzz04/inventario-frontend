import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Cambia al puerto donde corre tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
