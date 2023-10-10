import axios from 'axios';
import { CONFIG } from './Config.js'

const fetchClient = () => {
  const axiosInstance = axios.create({
    baseURL: CONFIG.BASE_URL,
    timeout: 5000,
  });
  
  axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('accessToken');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

  return axiosInstance;
}


export default fetchClient;