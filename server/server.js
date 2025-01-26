const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import Routes
const studentRoutes = require("./routes/students");
const companyRoutes = require("./routes/companies");
const placementDriveRoutes = require("./routes/placementDrive");
const recruitmentStatusRoutes = require("./routes/recruitmentStatus");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/placement-drives", placementDriveRoutes);
app.use("/api/recruitment-status", recruitmentStatusRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the College Placement Management System API");
});

// Connect to MongoDB
mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/college-placement", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5001, () => {
      console.log("Server running on http://localhost:5001");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
