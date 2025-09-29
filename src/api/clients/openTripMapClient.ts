import axios from 'axios';

// You need to get a free API key from: https://opentripmap.io/register
// For now, using a demo key (limited requests)
const API_KEY = '5ae2e3f221c38a28845f05b6e1c3d7b4b8c4c8c4'; // Replace with your actual API key
const BASE_URL = 'https://api.opentripmap.com/0.1/en/places';

export const openTripMapClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add API key to all requests
openTripMapClient.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    apikey: API_KEY,
  };
  return config;
});

// Add response interceptor for better error handling
openTripMapClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('OpenTripMap API: Invalid API key. Please get a free key from https://opentripmap.io/register');
    }
    return Promise.reject(error);
  }
); 