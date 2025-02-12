const sendEmail = require('../utils/sendEmail');
const Joi = require('joi');
const Deal = require('../models/Deal');
const Customer = require('../models/Customer');

const dealSchema = Joi.object({
  title: Joi.string().min(3).required(),
  value: Joi.number().required(),
  customer: Joi.string().required(),
});

// Get all deals
exports.getAllDeals = async (req, res) => {
  try {
    const deals = await Deal.find();
    res.json(deals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single deal by ID
exports.getDealById = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }
    res.json(deal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new deal
exports.createDeal = async (req, res) => {
  // Validate request data
  const { error } = dealSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, value, customer } = req.body;

  try {
    const newDeal = new Deal({ title, value, customer });
    await newDeal.save();

    // Send email notification to the customer
    const customerDetails = await Customer.findById(customer).select('email');
    await sendEmail(customerDetails.email, 'New Deal Created', `Deal "${title}" has been created.`);

    res.status(201).json(newDeal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update deal by ID
exports.updateDealById = async (req, res) => {
  // Validate request data
  const { error } = dealSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updatedDeal = await Deal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDeal) {
      return res.status(404).json({ message: 'Deal not found' });
    }
    res.json(updatedDeal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete deal by ID
exports.deleteDealById = async (req, res) => {
  try {
    const deal = await Deal.findByIdAndDelete(req.params.id);
    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }
    res.json({ message: 'Deal deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
