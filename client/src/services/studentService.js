// src/services/studentService.js
import api from './api'; // Our smart, interceptor-equipped axios instance

// Function to finalize the deposit after scanning the admin's QR code
const finalizeDeposit = async (tempToken, mobile) => {
  try {
    // The auth token is added automatically by the interceptor in api.js
    const response = await api.post('/student/finalize-deposit', { tempToken, mobile });
    // The response will contain the final deposit details and the student's own QR code
    return response.data;
  } catch (error) {
    // Propagate the error message from the backend
    throw error.response.data.message || 'Failed to finalize deposit.';
  }
};

const studentService = {
  finalizeDeposit,
};

export default studentService;