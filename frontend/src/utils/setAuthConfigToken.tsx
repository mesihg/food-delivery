import axios, {AxiosError, InternalAxiosRequestConfig} from 'axios';

export const setAuthConfigToken = (token: string | null): void => {
  if (token) {
    axios.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );

    axios.interceptors.response.use(
      res => res,
      (err: AxiosError) => {
        return Promise.resolve(err?.response?.data);
      },
    );
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
