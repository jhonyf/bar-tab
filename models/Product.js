var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name: String,
  image_url: String
});

module.exports = mongoose.model('Product', productSchema);
