const express = require('express');
const { getPlacements, createPlacement } = require('../controllers/placementController');
const router = express.Router();

if (!company || !Date || !participants){
  return resizeBy.status(400).json({ message: "All fields are required"});
}

router.get('/', getPlacements);
router.post('/', createPlacement);

module.exports = router;
