var mongoose = require('mongoose');

var orderedDrinkSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  actual_price: Number,
  ordered_at: Date
});

var roundSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bar: { type: mongoose.Schema.Types.ObjectId, ref: 'Bar' },
  ordered_at: Date,
  ordered_beverages: [orderedDrinkSchema],
  is_open: Boolean,
  total_cost: Number
});

module.exports = mongoose.model('Round', roundSchema);
