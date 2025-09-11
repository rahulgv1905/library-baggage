// server/index.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Import route files
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');

// Load environment variables and connect to DB
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// --- CORRECTED CORS CONFIGURATION ---
const corsOptions = {
  origin: 'https://librarybaggage.netlify.app',
  optionsSuccessStatus: 200
};

// This single 'app.use' line correctly handles ALL requests, including security pre-flights.
app.use(cors(corsOptions));

// Standard Middleware
app.use(express.json());

// A simple test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
