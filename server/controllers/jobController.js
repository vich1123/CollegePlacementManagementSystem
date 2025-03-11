const Job = require("../models/Job");

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const { title, company, description, requirements } = req.body;

    if (!title || !company || !description || !requirements) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newJob = new Job({ title, company, description, requirements });
    await newJob.save();

    res.status(201).json({ success: true, message: "Job created successfully", data: newJob });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// Get all jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// Get job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// Delete job by ID
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};
