const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const logger = require('./middleware/logger');
const path = require('path'); // Import path module for serving static files

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to the database
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware for URL-encoded payloads
app.use(logger); // Custom logger middleware

// Import routes
const studentRoutes = require('./routes/students');
const companyRoutes = require('./routes/companies');
const placementRoutes = require('./routes/placements');

// Route middlewares
app.use('/api/students', studentRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/placements', placementRoutes);

// Suppress Mongoose strictQuery warning
mongoose.set('strictQuery', false);

// Serve React frontend (if available)
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

//static files

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});


// Database connection and server startup
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
