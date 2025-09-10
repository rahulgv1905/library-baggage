// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // <-- IMPORT LAYOUT
import HomePage from './pages/HomePage';
import AdminLoginPage from './pages/AdminLoginPage';
import StudentLoginPage from './pages/StudentLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import './App.css';

function App() {
  return (
    <Router>
      {/* Wrap everything inside our new Layout component */}
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/student/login" element={<StudentLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;