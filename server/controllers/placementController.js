const Placement = require("../models/Placement");
const mongoose = require("mongoose");

// Fetch all placement drives
const getPlacements = async (req, res) => {
  try {
    const placements = await Placement.find().populate("companyId", "name"); // Populate company details
    res.status(200).json({ success: true, data: placements });
  } catch (error) {
    console.error("Error fetching placements:", error);
    res.status(500).json({ success: false, message: "Error fetching placements", error: error.message });
  }
};

// Fetch a single placement drive by ID
const getPlacementById = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id).populate("companyId", "name");
    if (!placement) {
      return res.status(404).json({ success: false, message: "Placement drive not found" });
    }
    res.status(200).json({ success: true, data: placement });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching placement drive", error: error.message });
  }
};

// Fetch placement drives by status (ongoing or completed)
const getPlacementsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const placements = await Placement.find({ status }).populate("companyId", "name");
    if (placements.length === 0) {
      return res.status(404).json({ success: false, message: `No ${status} placement drives found` });
    }
    res.status(200).json({ success: true, data: placements });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching placement drives", error: error.message });
  }
};

// Create a new placement drive
const createPlacement = async (req, res) => {
  try {
    const { title, description, status, companyId } = req.body;

    // Validate required fields
    if (!title || !description || !companyId) {
      return res.status(400).json({ success: false, message: "Title, Description, and Company ID are required!" });
    }

    // Validate companyId format
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ success: false, message: "Invalid company ID format!" });
    }

    const newPlacement = new Placement({
      title,
      description,
      companyId: mongoose.Types.ObjectId(companyId), // Ensure ObjectId
      status: status || "ongoing", // Default status to ongoing
    });

    await newPlacement.save();
    
    res.status(201).json({ success: true, message: "Placement drive created successfully!", data: newPlacement });
  } catch (error) {
    console.error("Error creating placement drive:", error);
    res.status(500).json({ success: false, message: "Error creating placement drive", error: error.message });
  }
};

// Update an existing placement drive
const updatePlacement = async (req, res) => {
  try {
    const placement = await Placement.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("companyId", "name");
    if (!placement) {
      return res.status(404).json({ success: false, message: "Placement drive not found" });
    }
    res.status(200).json({ success: true, message: "Placement drive updated successfully!", data: placement });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating placement drive", error: error.message });
  }
};

// Delete a placement drive
const deletePlacement = async (req, res) => {
  try {
    const placement = await Placement.findByIdAndDelete(req.params.id);
    if (!placement) {
      return res.status(404).json({ success: false, message: "Placement drive not found" });
    }
    res.status(200).json({ success: true, message: "Placement drive deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting placement drive", error: error.message });
  }
};

module.exports = {
  getPlacements,
  getPlacementById,
  getPlacementsByStatus,
  createPlacement,
  updatePlacement,
  deletePlacement
};
