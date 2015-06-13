var Bar = require('../models/Bar'),
  Price = require('../models/Price');

exports.index = function(req, res) {
  Bar.find({})
    .sort("name")
    .exec(function(err, bars) {
      res.render('bars/index', {
        bars: bars,
        title: 'Bars'
      });
    });
};

exports.show = function(req, res) {
  Price.find({bar: req.params.barId})
    .sort("name")
    .populate("product")
    .populate("bar")
    .exec(function(err, prices) {
      res.render('bars/show', {
        prices: prices,
        title: 'Available Drinks'
      });
    });
};
