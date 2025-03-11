const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

// Job Routes
router.post("/", jobController.createJob);
router.get("/", jobController.getJobs);
router.get("/:id", jobController.getJobById);
router.delete("/:id", jobController.deleteJob);

module.exports = router;
