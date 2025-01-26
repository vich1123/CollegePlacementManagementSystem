const express = require("express");
const cors = require("cors");
const connectDB = require("./db"); // Import the MongoDB connection function

// Import Routes
const studentRoutes = require("./routes/students");
const companyRoutes = require("./routes/companies");
const placementsRoutes = require('./routes/placements');
const recruitmentStatusRoutes = require("./routes/recruitmentStatus");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/companies", companyRoutes);
app.use('/api/placement-drives', placementsRoutes);
app.use("/api/recruitment-status", recruitmentStatusRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the College Placement Management System API");
});

// Connect to MongoDB and Start the Server
connectDB().then(() => {
  app.listen(5001, () => {
    console.log("Server running on http://localhost:5001");
  });
}).catch((err) => {
  console.error("Failed to start server due to database connection error:", err.message);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
