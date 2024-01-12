// customAxios.js file where the Axios instance is defined

import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'https://abibiman-api.onrender.com',
  // You can switch between different base URLs as needed
  // baseURL: "http://localhost:4000/api/v1",
  // baseURL: "https://cedi-rates-api-dev.onrender.com/api/v1",
  // baseURL: "https://cedi-rates.herokuapp.com/api/v1",
});

const STORAGE_KEY = 'accessToken';

customAxios.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem(STORAGE_KEY);
    if (accessToken) {
      config.headers.Authorization = `Basic ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// customAxios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized error (e.g., logout user)
//       console.error('Unauthorized error:', error);
//       sessionStorage.removeItem(STORAGE_KEY);
//     } else {
//       // Handle other response errors
//       console.error('Response error:', error);
//     }
//     return Promise.reject(error);
//   }
// );

customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403)
    ) {
      console.error('Unauthorized error:', error);

      sessionStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('userInfo');
    } else {
      console.error('Response error:', error);
    }
    return Promise.reject(error);
  }
);
export default customAxios;
