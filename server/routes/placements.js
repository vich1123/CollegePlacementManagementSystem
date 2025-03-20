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

// ** Fetch all placements **
router.get("/", async (req, res) => {
  try {
    const placements = await getPlacements();
    res.status(200).json({ success: true, data: placements });
  } catch (error) {
    console.error("Error fetching placements:", error);
    res.status(500).json({ success: false, message: "Error fetching placements", error: error.message });
  }
});

// ** Fetch placement by ID **
router.get("/:id", async (req, res) => {
  try {
    const placement = await getPlacementById(req.params.id);
    if (!placement) return res.status(404).json({ success: false, message: "Placement not found" });
    res.status(200).json({ success: true, data: placement });
  } catch (error) {
    console.error("Error fetching placement by ID:", error);
    res.status(500).json({ success: false, message: "Error fetching placement", error: error.message });
  }
});

// ** Fetch placements by status **
router.get("/status/:status", async (req, res) => {
  try {
    const placements = await getPlacementsByStatus(req.params.status);
    res.status(200).json({ success: true, data: placements });
  } catch (error) {
    console.error("Error fetching placements by status:", error);
    res.status(500).json({ success: false, message: "Error fetching placements", error: error.message });
  }
});

// ** Create a new placement drive **
router.post("/", async (req, res) => {
  try {
    const { title, description, companyId } = req.body;
    if (!companyId) {
      return res.status(400).json({ success: false, message: "Company ID is required." });
    }
    const newPlacement = await createPlacement(req, res);
    res.status(201).json({ success: true, data: newPlacement });
  } catch (error) {
    console.error("Error creating placement drive:", error);
    res.status(500).json({ success: false, message: "Error creating placement", error: error.message });
  }
});

// ** Update placement drive **
router.put("/:id", updatePlacement);

// ** Delete placement drive **
router.delete("/:id", deletePlacement);

module.exports = router;
