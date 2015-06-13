var mongoose = require('mongoose');

var barSchema = new mongoose.Schema({
  name: String,
  lat: String,
  lng: String,
  image_url: String
});

module.exports = mongoose.model('Bar', barSchema);
