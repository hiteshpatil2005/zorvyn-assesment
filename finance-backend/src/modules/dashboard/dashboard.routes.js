const express = require('express');
const router = express.Router();
const { getSummary } = require('./dashboard.controller');
const { checkRole } = require('../../middleware/auth.middleware');

router.get('/summary', checkRole('analyst', 'admin'), getSummary);

module.exports = router;