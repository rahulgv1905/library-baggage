// client/src/pages/StudentLoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

// --- MUI Imports ---
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';

const StudentLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side check for the required email domain
    if (!email.endsWith('@vitstudent.ac.in')) {
      setError('Please use a valid @vitstudent.ac.in email address.');
      return;
    }
    setLoading(true);

    try {
      const userData = await authService.login(email, password);
      // Ensure the logged-in user is a student
      if (userData.role === 'student') {
        navigate('/student/dashboard');
      } else {
        authService.logout(); // Log out non-student users
        setError('Access Denied: This login is for students only.');
      }
    } catch (err) {
      // --- THE FIX IS HERE ---
      // This ensures we always set a string to the error state, preventing the crash.
      const errorMessage = typeof err === 'string' ? err : 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
      console.error(err); // We still log the original error for debugging.
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid #ddd',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Typography component="h1" variant="h5">
          Student Login
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="University Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name.lastname@vitstudent.ac.in"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default StudentLoginPage;
