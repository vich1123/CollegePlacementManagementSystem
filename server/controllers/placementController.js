const Placement = require("../models/Placement");

// Fetch all placements
const getPlacements = async (req, res) => {
  try {
    const placements = await Placement.find();
    res.status(200).json(placements);
  } catch (error) {
    res.status(500).json({ message: "Error fetching placements", error: error.message });
  }
};

// Add a new placement
const createPlacement = async (req, res) => {
  const { companyId, position, date } = req.body;

  if (!companyId || !position || !date) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const newPlacement = new Placement({ companyId, position, date });
    await newPlacement.save();
    res.status(201).json({ message: "Placement added successfully!", placement: newPlacement });
  } catch (error) {
    res.status(500).json({ message: "Error adding placement", error: error.message });
  }
};

module.exports = { getPlacements, createPlacement };
