const Student = require('../models/Student');
const Placement = require('../models/Placement');
const Company = require('../models/Company');

const getRecruitmentStatus = async (req, res) => {
  try {
    const studentsPlaced = await Student.countDocuments({ placed: true });
    const offersMade = await Placement.countDocuments();
    const companiesParticipated = await Company.countDocuments();

    res.status(200).json({ studentsPlaced, offersMade, companiesParticipated });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recruitment status' });
  }
};

module.exports = { getRecruitmentStatus };
