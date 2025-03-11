const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Ensure the uploads directory exists
const fs = require("fs");
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// File upload endpoint
router.post("/", upload.single("resume"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  res.status(201).json({
    success: true,
    message: "File uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
  });
});

module.exports = router;
