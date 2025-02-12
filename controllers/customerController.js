const sendEmail = require('../utils/sendEmail');
const Joi = require('joi');
const Customer = require('../models/Customer');

const customerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).required()
});

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get customers with pagination
exports.getCustomers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const customers = await Customer.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Customer.countDocuments();

    res.json({
      customers,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new customer
exports.createCustomer = async (req, res) => {
  // Validate request data
  const { error } = customerSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, phone } = req.body;

  try {
    const newCustomer = new Customer({ name, email, phone });
    await newCustomer.save();

    // Send email notification
    await sendEmail(email, 'Welcome to Our CRM', 'Thank you for becoming a customer!');

    res.status(201).json(newCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update customer by ID
exports.updateCustomerById = async (req, res) => {
  // Validate request data
  const { error } = customerSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(updatedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete customer by ID
exports.deleteCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
