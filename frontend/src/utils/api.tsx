import axios, {AxiosError, InternalAxiosRequestConfig} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isEmpty from './isEmpty';

export const api = axios.create({
  baseURL: 'http://10.0.2.2:8000/api',
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFTOKEN',
});

axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token: string | null = await AsyncStorage.getItem('token');
    const formattedToken: string = token ?? '';
    const tokenData = JSON.parse(formattedToken);
    if (tokenData) {
      config.headers.Authorization = `Bearer ${tokenData}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  res => res,
  (err: AxiosError) => {
    if (!isEmpty(err.response?.data)) {
      console.log(err.response?.data);
    }
    return Promise.resolve(err?.response?.data);
  },
);
