// client/src/pages/HomePage.js

import React from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Make sure this import is correct

const HomePage = () => {
  const navigate = useNavigate(); // <-- Make sure this line is inside the component

  const handleStudentLogin = () => {
    navigate('/student/login');
  };

  const handleAdminLogin = () => {
    navigate('/admin/login');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Library Baggage Management</h1>
      <h2>Welcome!</h2>
      <p>Please select your login type:</p>
      
      <div className="button-container">
        <button onClick={handleStudentLogin} className="nav-button">
          Student Login
        </button>

        <button onClick={handleAdminLogin} className="nav-button">
          Admin Login
        </button>
      </div>
    </div>
  );
};

export default HomePage;
