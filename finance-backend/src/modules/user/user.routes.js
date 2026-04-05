const express = require('express');
const router = express.Router();
const { createUser, getUsers } = require('./user.controller');
const { checkRole } = require('../../middleware/auth.middleware');

router.post('/', checkRole('admin'), createUser);
router.get('/', checkRole('admin'), getUsers);

module.exports = router;