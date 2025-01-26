const RecruitmentStatus = require("../models/RecruitmentStatus");

// Get Recruitment Status
exports.getRecruitmentStatus = async (req, res) => {
  try {
    const status = await RecruitmentStatus.findOne();
    if (!status) {
      return res.status(404).json({ message: "Recruitment status not found" });
    }
    res.status(200).json({ data: status });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching recruitment status",
      error: error.message,
    });
  }
};

// Create Recruitment Status
exports.createRecruitmentStatus = async (req, res) => {
  try {
    const { studentsPlaced, offersMade, companiesParticipated } = req.body;
    const newStatus = new RecruitmentStatus({
      studentsPlaced,
      offersMade,
      companiesParticipated,
    });
    await newStatus.save();
    res.status(201).json({
      message: "Recruitment status created successfully!",
      data: newStatus,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating recruitment status",
      error: error.message,
    });
  }
};
