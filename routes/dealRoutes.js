const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getAllDeals,
  getDealById,
  createDeal,
  updateDealById,
  deleteDealById,
} = require('../controllers/dealController');

router.route('/').get(protect, getAllDeals).post(protect, createDeal);
router
  .route('/:id')
  .get(protect, getDealById)
  .put(protect, updateDealById)
  .delete(protect, deleteDealById);

module.exports = router;
