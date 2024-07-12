import axios from 'axios';
import errorHandler from './errorHandler';

// Fungsi untuk menentukan baseURL
const getBaseURL = () => {
  const isLocalhost = window.location.hostname === 'localhost';
  return isLocalhost ? 'http://localhost:3000' : 'https://api.sidera.my.id';
};

// Membuat instance Axios dengan konfigurasi dasar
const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  // Konfigurasi lain seperti headers dapat ditambahkan di sini
  // timeout: 10000, // Timeout request 10 detik
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use((response) => response, errorHandler);

export default axiosInstance;
