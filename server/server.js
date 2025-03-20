const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");

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

// CORS Configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

// Middleware for Debugging API Requests
app.use((req, res, next) => {
  console.log(`API Request: ${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("Request Body:", JSON.stringify(req.body, null, 2));
  }
  next();
});

// JSON Parsing Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Serve Static Files (Uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

// Handle 404 Errors
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    requestedRoute: req.originalUrl,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

// Start Server and Connect to MongoDB
const startServer = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await connectDB();
    console.log("MongoDB Connected Successfully");

    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    // Graceful Shutdown for Stability
    const gracefulShutdown = async (signal) => {
      console.log(`Received ${signal}. Shutting down gracefully...`);
      await mongoose.connection.close();
      server.close(() => {
        console.log("Server closed.");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  } catch (err) {
    console.error("Database Connection Failed:", err);
    process.exit(1);
  }
};

// Start the Server only if MongoDB is Connected Properly
startServer();
