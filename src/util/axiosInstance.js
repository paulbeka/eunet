import axios from 'axios';
import { CONFIG } from './Config.js'

const axiosInstance = axios.create({
  baseURL: CONFIG.BASE_URL,
  timeout: 5000,
});

export default axiosInstance;