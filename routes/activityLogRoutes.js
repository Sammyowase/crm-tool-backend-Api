const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { getAllActivityLogs, getActivityLogById } = require('../controllers/activityLogController');

router.route('/').get(protect, admin, getAllActivityLogs);
router.route('/:id').get(protect, admin, getActivityLogById);

module.exports = router;
