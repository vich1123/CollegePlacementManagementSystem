require('dotenv').config(); // Ensure environment variables are loaded
const express = require('express');
const cors = require('cors');
const path = require('path'); // Required for serving static files
const logger = require('./middleware/logger');
const connectDB = require('./config/db'); // Ensure db.js path is correct
const studentRoutes = require('./routes/students');
const companyRoutes = require('./routes/companies');
const placementRoutes = require('./routes/placements');
const recruitmentRoutes = require('./routes/recruitmentStatus');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(logger);

// Connect to MongoDB
connectDB();

// Mount API routes
app.use('/api/students', studentRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/placements', placementRoutes);
app.use('/api/recruitment-status', recruitmentRoutes);

// Serve React frontend
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
