var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  bar: { type: mongoose.Schema.Types.ObjectId, ref: 'Bar' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  price: Number,
});

module.exports = mongoose.model('Price', schema);
