// src/components/Layout.js
import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

// The 'children' prop is where our page content will be rendered
const Layout = ({ children }) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <QrCodeScannerIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Library Baggage Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </div>
  );
};

export default Layout;