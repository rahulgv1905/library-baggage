// src/pages/AdminDashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import adminService from '../services/adminService';
import QrScanner from '../components/QrScanner';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // State for the GENERATE QR section
  const [containerNumber, setContainerNumber] = useState('');
  const [generateLoading, setGenerateLoading] = useState(false);
  const [generateError, setGenerateError] = useState('');
  const [qrCodeImage, setQrCodeImage] = useState('');

  // State for the COLLECT BAGGAGE section
  const [isScanning, setIsScanning] = useState(false);
  const [collectLoading, setCollectLoading] = useState(false);
  const [collectError, setCollectError] = useState('');
  const [collectionResult, setCollectionResult] = useState(null);

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const handleGenerateQr = async (e) => {
    e.preventDefault();
    setGenerateError('');
    setQrCodeImage('');
    setGenerateLoading(true);
    try {
      const data = await adminService.generateQrCode(containerNumber);
      setQrCodeImage(data.qrCode);
      setContainerNumber(''); // Clear input on success
    } catch (err) {
      setGenerateError(err);
    } finally {
      setGenerateLoading(false);
    }
  };

  const onScanSuccess = async (decodedText) => {
    setIsScanning(false);
    setCollectLoading(true);
    setCollectError('');
    setCollectionResult(null);
    try {
      const result = await adminService.collectBaggage(decodedText);
      setCollectionResult(result.depositDetails);
    } catch (err) {
      setCollectError(err);
    } finally {
      setCollectLoading(false);
    }
  };

  const onScanError = (errorMessage) => {
    // This callback can be used for debugging scan errors if needed
  };

  const clearCollectionState = () => {
    setCollectionResult(null);
    setCollectError('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* --- GENERATE SECTION --- */}
      <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc' }}>
        <h3>1. Generate Deposit QR Code</h3>
        <form onSubmit={handleGenerateQr}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="container" style={{ display: 'block', marginBottom: '5px' }}>Container Number:</label>
            <input
              type="text"
              id="container"
              value={containerNumber}
              onChange={(e) => setContainerNumber(e.target.value)}
              placeholder="e.g., A01"
              required
              style={{ width: '200px', padding: '8px' }}
            />
          </div>
          <button type="submit" disabled={generateLoading} style={{ padding: '10px 20px' }}>
            {generateLoading ? 'Generating...' : 'Generate QR Code'}
          </button>
        </form>
        {generateError && <p style={{ color: 'red', marginTop: '10px' }}>{generateError}</p>}
        {qrCodeImage && (
          <div style={{ marginTop: '20px' }}>
            <h4>Scan This Code</h4>
            <img src={qrCodeImage} alt="Generated QR Code" />
          </div>
        )}
      </div>

      {/* --- COLLECTION SECTION --- */}
      <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc' }}>
        <h3>2. Collect Baggage</h3>
        {!isScanning && !collectionResult && !collectError && (
          <button onClick={() => setIsScanning(true)} style={{ padding: '10px 20px' }}>
            Scan Student's QR Code
          </button>
        )}
        {isScanning && (
          <div>
            <QrScanner onScanSuccess={onScanSuccess} onScanError={onScanError} />
            <button onClick={() => setIsScanning(false)} style={{ marginTop: '10px' }}>Cancel Scan</button>
          </div>
        )}
        {collectLoading && <p>Verifying...</p>}
        {collectError && (
          <div style={{ marginTop: '20px', padding: '15px', border: '1px solid red', color: 'red' }}>
            <p><strong>Error:</strong> {collectError}</p>
            <button onClick={clearCollectionState}>Try Again</button>
          </div>
        )}
        {collectionResult && (
          <div style={{ marginTop: '20px', padding: '15px', border: '1px solid green' }}>
            <h4 style={{ color: 'green' }}>Collection Successful!</h4>
            <p><strong>Retrieve bag from Container:</strong> {collectionResult.container?.containerNumber}</p>
            <p><strong>Student Name:</strong> {collectionResult.student?.name}</p>
            <p><strong>Student Mobile:</strong> {collectionResult.student?.mobile}</p>
            <button onClick={clearCollectionState}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;