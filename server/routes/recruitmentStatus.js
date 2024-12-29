const express = require('express');
const { getRecruitmentStatus } = require('../controllers/recruitmentStatusController');
const router = express.Router();

router.get('/', getRecruitmentStatus);

module.exports = router;
