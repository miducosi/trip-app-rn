import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

export const countriesClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for better error handling
countriesClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Countries API Error:', error.message);
    return Promise.reject(error);
  }
); 