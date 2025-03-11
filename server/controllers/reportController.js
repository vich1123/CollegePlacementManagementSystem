const Report = require("../models/Report");

// Get all reports
exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.json({ success: true, data: reports });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Create a new report
exports.createReport = async (req, res) => {
  try {
    const { title, totalStudents, studentsPlaced, offersMade, companiesParticipated } = req.body;

    if (!title || !totalStudents || !studentsPlaced || !offersMade || !companiesParticipated) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newReport = new Report({ title, totalStudents, studentsPlaced, offersMade, companiesParticipated });
    await newReport.save();

    res.status(201).json({ success: true, message: "Report created successfully!", data: newReport });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
