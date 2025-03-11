const RecruitmentStatus = require("../models/RecruitmentStatus");

// Fetch all recruitment status history
exports.getRecruitmentStatusHistory = async (req, res) => {
  try {
    const statuses = await RecruitmentStatus.find().sort({ createdAt: 1 }); // Fetch in ascending order

    if (!statuses || statuses.length === 0) {
      return res.status(404).json({ success: false, message: "No recruitment status history found" });
    }

    res.status(200).json({ success: true, data: statuses });
  } catch (error) {
    console.error("Error fetching recruitment status history:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// Fetch the latest recruitment status
exports.getLatestRecruitmentStatus = async (req, res) => {
  try {
    const status = await RecruitmentStatus.findOne().sort({ createdAt: -1 }); // Get latest

    if (!status) {
      return res.status(404).json({ success: false, message: "No latest recruitment status found" });
    }

    res.status(200).json({ success: true, data: status });
  } catch (error) {
    console.error("Error fetching latest recruitment status:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// Create new recruitment status entry
exports.createRecruitmentStatus = async (req, res) => {
  try {
    const { studentsPlaced, offersMade, companiesParticipated } = req.body;

    if (!studentsPlaced || !offersMade || !companiesParticipated) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newStatus = new RecruitmentStatus({
      studentsPlaced,
      offersMade,
      companiesParticipated,
      createdAt: new Date()
    });

    await newStatus.save();

    res.status(201).json({ success: true, message: "Recruitment status created successfully", data: newStatus });
  } catch (error) {
    console.error("Error creating recruitment status:", error);
    res.status(500).json({ success: false, message: "Error creating recruitment status", error: error.message });
  }
};

// Delete all recruitment statuses
exports.deleteRecruitmentStatus = async (req, res) => {
  try {
    await RecruitmentStatus.deleteMany({});
    res.status(200).json({ success: true, message: "All recruitment statuses deleted successfully" });
  } catch (error) {
    console.error("Error deleting recruitment statuses:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// Delete a specific recruitment status by ID
exports.deleteRecruitmentStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await RecruitmentStatus.findByIdAndDelete(id);

    if (!status) {
      return res.status(404).json({ success: false, message: "Recruitment status not found" });
    }

    res.status(200).json({ success: true, message: "Recruitment status deleted successfully" });
  } catch (error) {
    console.error("Error deleting recruitment status:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};
