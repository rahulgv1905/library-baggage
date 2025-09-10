// src/services/adminService.js
import api from './api'; // Our smart, interceptor-equipped axios instance

// Function to generate the initial QR code for a container
const generateQrCode = async (containerNumber) => {
  try {
    const response = await api.post('/admin/generate-qr', { containerNumber });
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Failed to generate QR code.';
  }
};

// --- NEW FUNCTION ---
// Function to collect baggage by scanning the student's QR code
const collectBaggage = async (depositQRCodeId) => {
  try {
    // The interceptor adds the auth token automatically
    const response = await api.post('/admin/collect-baggage', { depositQRCodeId });
    // The response contains the full deposit details for verification
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Failed to process baggage collection.';
  }
};


const adminService = {
  generateQrCode,
  collectBaggage, // <-- EXPORT NEW FUNCTION
};

export default adminService;