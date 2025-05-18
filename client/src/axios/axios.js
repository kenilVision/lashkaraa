// axiosInstance.js
import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRIPE_BEurl, 
  headers: {
    'Content-Type': 'application/json', 
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('Token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response.data, 
  (error) => Promise.reject(error) 
);

export default axiosInstance;