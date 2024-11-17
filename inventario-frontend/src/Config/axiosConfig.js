import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // Cambia al puerto donde corre tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
