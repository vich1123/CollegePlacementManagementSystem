const express = require("express");
const {
  getPlacements,
  getPlacementById,
  getPlacementsByStatus,
  createPlacement,
  updatePlacement,
  deletePlacement
} = require("../controllers/placementController");

const router = express.Router();

// Fetch all placement drives
router.get("/", getPlacements);

// Fetch a single placement drive by ID
router.get("/:id", getPlacementById);

// Fetch placement drives by status (ongoing or completed)
router.get("/status/:status", getPlacementsByStatus);

// Create a new placement drive
router.post("/", async (req, res) => {
  try {
    const { title, description, companyId } = req.body;

    if (!companyId) {
      return res.status(400).json({ message: "Company ID is required." });
    }

    await createPlacement(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error creating placement drive", error });
  }
});

// Update a placement drive
router.put("/:id", updatePlacement);

// Delete a placement drive
router.delete("/:id", deletePlacement);

module.exports = router;
