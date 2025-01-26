const Placement = require("../models/Placement");

// Fetch all placements
const getPlacements = async (req, res) => {
  try {
    const placements = await Placement.find();
    res.status(200).json({ success: true, data: placements });
  } catch (error) {
    res.status(500).json({ message: "Error fetching placements", error: error.message });
  }
};

// Add a new placement
const createPlacement = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const newPlacement = new Placement({ title, description });
    await newPlacement.save();
    res.status(201).json({ message: "Placement drive created successfully!", data: newPlacement });
  } catch (error) {
    res.status(500).json({ message: "Error creating placement drive", error: error.message });
  }
};

module.exports = { getPlacements, createPlacement };
