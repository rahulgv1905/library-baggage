// src/services/api.js
import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: 'https://library-baggage.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// === AXIOS INTERCEPTOR ===
// This function will run before every single request is sent by axios
api.interceptors.request.use(
  (config) => {
    // Get the user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // If the user exists and has a token, add it to the request headers
    if (user && user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }

    // Must return the config object, otherwise the request will be blocked
    return config;
  },
  (error) => {
    // If there's an error during the request setup, reject the promise
    return Promise.reject(error);
  }
);

export default api;
