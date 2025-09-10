// src/pages/StudentDashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import studentService from '../services/studentService';
import QrScanner from '../components/QrScanner';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  // State to manage the workflow on the dashboard
  const [view, setView] = useState('initial'); // 'initial', 'scanning', 'details', 'success'
  const [scannedData, setScannedData] = useState('');
  const [mobile, setMobile] = useState('');
  
  // State for the final QR code
  const [finalQrCode, setFinalQrCode] = useState('');
  
  // State for loading and errors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = () => {
    authService.logout();
    navigate('/student/login');
  };

  // Called when the QR scanner successfully scans a code
  const onScanSuccess = (decodedText) => {
    setScannedData(decodedText);
    setView('details');
  };

  const onScanError = (errorMessage) => {
    // This can be used for debugging if needed
  };
  
  // Resets the view to the starting point
  const resetToInitial = () => {
    setView('initial');
    setError('');
    setScannedData('');
    setMobile('');
    setFinalQrCode('');
  };

  // Handles the final submission of the deposit
  const handleFinalizeDeposit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await studentService.finalizeDeposit(scannedData, mobile);
      setFinalQrCode(data.qrCode);
      setView('success');
    } catch (err) {
      setError(err);
      // If there's an error, we explicitly go back to the initial state
      setView('initial'); 
    } finally {
      // We only set loading to false. We no longer change the 'view' here.
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Student Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <h2>Welcome, {user?.name || 'Student'}!</h2>

      {/* Show an error message only when in the 'initial' view to avoid confusion */}
      {view === 'initial' && error && <p style={{ color: 'red', border: '1px solid red', padding: '10px' }}><strong>Error:</strong> {error}</p>}
      
      {/* View 1: Initial State */}
      {view === 'initial' && (
        <div style={{ marginTop: '30px' }}>
          <p>Ready to deposit your bag? Click the button below to start.</p>
          <button onClick={() => setView('scanning')} style={{ padding: '10px 20px', fontSize: '16px' }}>
            Deposit a Bag
          </button>
        </div>
      )}

      {/* View 2: QR Scanning State */}
      {view === 'scanning' && (
        <div style={{ marginTop: '30px' }}>
          <h3>Scan the QR Code</h3>
          <p>Please scan the QR code presented by the security admin.</p>
          <QrScanner onScanSuccess={onScanSuccess} onScanError={onScanError} />
          <button onClick={resetToInitial} style={{ marginTop: '20px' }}>Cancel</button>
        </div>
      )}

      {/* View 3: Final Details Form */}
      {view === 'details' && (
        <div style={{ marginTop: '30px' }}>
          <h3>Final Step: Confirm Details</h3>
          <p>QR Code scanned successfully! Please enter your mobile number to complete the deposit.</p>
          <form onSubmit={handleFinalizeDeposit}>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Your Mobile Number"
              required
              style={{ padding: '10px', fontSize: '16px', width: '200px' }}
            />
            <button type="submit" disabled={loading} style={{ padding: '10px 20px', fontSize: '16px', marginLeft: '10px' }}>
              {loading ? 'Depositing...' : 'Confirm Deposit'}
            </button>
          </form>
        </div>
      )}

      {/* View 4: Success State */}
      {view === 'success' && (
        <div style={{ marginTop: '30px', padding: '20px', border: '2px solid green', textAlign: 'center' }}>
          <h3>Deposit Confirmed!</h3>
          <p><strong>Show this QR code to the admin to collect your bag later.</strong></p>
          <img src={finalQrCode} alt="Your personal collection QR code" />
          <br />
          <button onClick={resetToInitial} style={{ marginTop: '20px' }}>Deposit Another Bag</button>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;