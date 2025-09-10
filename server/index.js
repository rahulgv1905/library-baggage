// server/index.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// --- THE FIX IS HERE: Import each route file only ONCE ---
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');

// Load environment variables and connect to DB
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// A simple test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Use the routes (this part should also have each route once)
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});