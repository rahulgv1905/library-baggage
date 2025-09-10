// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline } from '@mui/material'; // <-- IMPORT
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* CssBaseline provides a consistent styling baseline */}
    <CssBaseline /> 
    <App />
  </React.StrictMode>
);