const Report = require("../models/Report");

// ** Fetch all reports **
const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ year: -1 });
    res.status(200).json({ success: true, data: reports });
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ success: false, message: "Failed to fetch reports", error: err.message });
  }
};

// ** Fetch a report by year **
const getReportByYear = async (req, res) => {
  try {
    const { year } = req.params;
    const report = await Report.findOne({ year });

    if (!report) {
      return res.status(404).json({ success: false, message: "No report found for this year" });
    }

    res.status(200).json({ success: true, data: report });
  } catch (err) {
    console.error("Error fetching report by year:", err);
    res.status(500).json({ success: false, message: "Failed to fetch report", error: err.message });
  }
};

// ** Create a new report **
const createReport = async (req, res) => {
  try {
    const { title, year, totalStudents, studentsPlaced, offersMade, companiesParticipated } = req.body;

    if (!title || !year || !totalStudents || !studentsPlaced || !offersMade || !companiesParticipated) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if a report already exists for the given year
    const existingReport = await Report.findOne({ year });
    if (existingReport) {
      return res.status(400).json({ success: false, message: "Report for this year already exists." });
    }

    const newReport = new Report({
      title,
      year,
      totalStudents,
      studentsPlaced,
      offersMade,
      companiesParticipated,
    });

    await newReport.save();
    res.status(201).json({ success: true, message: "Report created successfully!", data: newReport });
  } catch (err) {
    console.error("Error creating report:", err);
    res.status(500).json({ success: false, message: "Failed to create report", error: err.message });
  }
};

// ** Update an existing report **
const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (!updatedData) {
      return res.status(400).json({ success: false, message: "No data provided for update" });
    }

    const updatedReport = await Report.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedReport) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    res.status(200).json({ success: true, message: "Report updated successfully!", data: updatedReport });
  } catch (err) {
    console.error("Error updating report:", err);
    res.status(500).json({ success: false, message: "Failed to update report", error: err.message });
  }
};

// ** Delete a report **
const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReport = await Report.findByIdAndDelete(id);

    if (!deletedReport) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    res.status(200).json({ success: true, message: "Report deleted successfully!" });
  } catch (err) {
    console.error("Error deleting report:", err);
    res.status(500).json({ success: false, message: "Failed to delete report", error: err.message });
  }
};

// ** Generate Yearly Placement Trends **
const getPlacementTrends = async (req, res) => {
  try {
    const reports = await Report.find().sort({ year: 1 });

    const trendData = reports.map((report) => ({
      year: report.year,
      placementRate: report.placementRate,
    }));

    res.status(200).json({ success: true, data: trendData });
  } catch (err) {
    console.error("Error fetching placement trends:", err);
    res.status(500).json({ success: false, message: "Failed to fetch placement trends", error: err.message });
  }
};

// ** Module Exports **
module.exports = {
  getReports,
  getReportByYear,
  createReport,
  updateReport,
  deleteReport,
  getPlacementTrends,
};
