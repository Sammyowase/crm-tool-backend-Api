const mongoose = require('mongoose');
const DealSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
  }, {
    timestamps: true,
  });
  
  module.exports = mongoose.model('Deal', DealSchema);
  