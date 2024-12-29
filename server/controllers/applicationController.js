const Application = require("../models/Application");

// Fetch all applications
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate("student company");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
};

// Update application status
const updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required!" });
  }

  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json({ message: "Application status updated!", application: updatedApplication });
  } catch (error) {
    res.status(500).json({ message: "Error updating application", error: error.message });
  }
};

module.exports = { createApplication, getApplications, updateApplicationStatus };
