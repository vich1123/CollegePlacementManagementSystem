const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MongoDB URI is missing! Check your .env file.");
    }

    // Prevent reconnection if already connected
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB is already connected.");
      return;
    }

    // Enable strict mode for queries
    mongoose.set("strictQuery", true);

    // Connection options for stability
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds if unable to connect
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    // Attempt MongoDB connection
    await mongoose.connect(mongoURI, options);

    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);

    // Ensures process does not exit in production environments
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
