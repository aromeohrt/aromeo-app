import axios from 'axios';
import Idx from 'idx';

const getAxiosInstance = () => {
  const instance = axios.create({
    baseURL: `baseURL`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 1000 * 60,
  });
  // Add a request interceptor
  instance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error),
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (Idx(error, (_) => _.response.data)) {
        return Promise.reject(error.response.data);
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

export default getAxiosInstance;
