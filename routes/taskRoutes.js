const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
} = require('../controllers/taskController');

router.route('/').get(protect, getAllTasks).post(protect, createTask);
router
  .route('/:id')
  .get(protect, getTaskById)
  .put(protect, updateTaskById)
  .delete(protect, deleteTaskById);

module.exports = router;
