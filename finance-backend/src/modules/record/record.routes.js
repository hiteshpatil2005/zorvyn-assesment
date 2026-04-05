const express = require('express');
const router = express.Router();

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
} = require('./record.controller');

const { checkRole } = require('../../middleware/auth.middleware');

router.post('/', checkRole('admin'), createRecord);
router.get('/', checkRole('viewer', 'analyst', 'admin'), getRecords);
router.put('/:id', checkRole('admin'), updateRecord);
router.delete('/:id', checkRole('admin'), deleteRecord);

module.exports = router;