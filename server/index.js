const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

// Middleware
app.use(cors());
app.use(logger);
app.use(bodyParser.json()); // Parses JSON request bodies

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

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
