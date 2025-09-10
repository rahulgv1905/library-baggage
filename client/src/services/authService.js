// src/services/authService.js
import api from './api'; // Import our pre-configured axios instance

// Function to handle user login
const login = async (email, password) => {
  try {
    const response = await api.post('/users/login', { email, password });

    // If the login is successful, the backend sends user data and a token.
    // We'll store this data in the browser's localStorage.
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    // Throw an error so the component can catch it and display a message
    throw error.response.data.message || 'An error occurred during login.';
  }
};

// Function to handle user logout
const logout = () => {
  localStorage.removeItem('user');
};

// Function to get the current user's data from localStorage
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};


const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;