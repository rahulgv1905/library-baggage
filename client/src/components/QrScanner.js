// src/components/QrScanner.js
import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QrScanner = ({ onScanSuccess, onScanError }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'qr-reader', // The ID of the div element where the scanner will be rendered
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5, // Frames per second
      },
      false // verbose output
    );

    // Render the scanner with our success and error callbacks
    scanner.render(onScanSuccess, onScanError);

    // Cleanup function to stop the scanner when the component unmounts
    return () => {
      scanner.clear().catch(error => {
        console.error("Failed to clear html5-qrcode-scanner.", error);
      });
    };
  }, [onScanSuccess, onScanError]);

  return (
    <div id="qr-reader" style={{ width: '100%', maxWidth: '500px', margin: 'auto' }}></div>
  );
};

export default QrScanner;