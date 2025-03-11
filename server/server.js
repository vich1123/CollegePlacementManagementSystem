const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
require("dotenv").config();

// Import Routes
const studentRoutes = require("./routes/students");
const companyRoutes = require("./routes/companies");
const placementsRoutes = require("./routes/placements");
const recruitmentStatusRoutes = require("./routes/recruitmentStatus");
const academicRecordsRoutes = require("./routes/academicRecords");
const jobRoutes = require("./routes/jobs");
const reportsRoutes = require("./routes/reports");
const notificationsRoutes = require("./routes/notifications");
const interviewsRoutes = require("./routes/interviews");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware for Logging Requests
app.use((req, res, next) => {
  console.log(`API Request: ${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) console.log("Request Body:", req.body);
  next();
});

// CORS Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://collegeplacementmanagementsystem.netlify.app",
      "https://collegeplacementmanagementsystem-1.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// JSON Parsing Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Static File Serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test API Route
app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "API is working!" });
});

// API Routes
app.use("/api/students", studentRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/placements", placementsRoutes);
app.use("/api/recruitment-status", recruitmentStatusRoutes);
app.use("/api/academicRecords", academicRecordsRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/interviews", interviewsRoutes);
app.use("/api/upload", uploadRoutes);

// Route Logging for Debugging
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    // Routes registered directly on app
    console.log(`Registered route: ${middleware.route.path}`);
  } else if (middleware.name === "router") {
    // Routes added as router
    middleware.handle.stack.forEach((route) => {
      if (route.route) {
        console.log(`Registered route: ${route.route.path}`);
      }
    });
  }
});

// Handle 404 Route Not Found
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
});

// Connect to MongoDB and Start Server
const startServer = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await connectDB();
    console.log("MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Database Connection Failed:", err);
    process.exit(1);
  }
};

// Start the Server
startServer();
