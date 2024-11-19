import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://inventario-backend-1.onrender.com', // URL del backend
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;

