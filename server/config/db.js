const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MongoDB URI is missing! Check your .env file.");
    }

    // Prevents reconnection if already connected
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB is already connected.");
      return;
    }

    // Enables strict mode for queries
    mongoose.set("strictQuery", true);

    // Attempt connection
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);

    // Ensures process does not exit on hosted platforms
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
