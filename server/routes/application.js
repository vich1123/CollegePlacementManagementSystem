const express = require("express");
const Application = require("../models/application");
const router = express.Router();

// Fetch all applications
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find().populate("student company");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
});

// Create a new application
router.post("/", async (req, res) => {
  const { student, company, status } = req.body;
  if (!student || !company) {
    return res.status(400).json({ message: "Student and company are required!" });
  }
  try {
    const application = new Application({ student, company, status });
    await application.save();
    res.status(201).json({ message: "Application created successfully!", application });
  } catch (error) {
    res.status(500).json({ message: "Error creating application", error: error.message });
  }
});

// Update application status
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ message: "Status is required!" });
  }
  try {
    const application = await Application.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json({ message: "Application updated successfully!", application });
  } catch (error) {
    res.status(500).json({ message: "Error updating application", error: error.message });
  }
});

module.exports = router;
