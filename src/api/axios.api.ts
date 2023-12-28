import axios from 'axios';
import { getTokenFromLS } from '../helpers/localStorage.helper';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    Authorization: `Bearer ` + getTokenFromLS() || '',
  },
});
