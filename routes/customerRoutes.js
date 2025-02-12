const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomerById,
  deleteCustomerById,
} = require('../controllers/customerController');

router.route('/').get(protect, getAllCustomers).post(protect, createCustomer);
router
  .route('/:id')
  .get(protect, getCustomerById)
  .put(protect, updateCustomerById)
  .delete(protect, deleteCustomerById);

module.exports = router;
