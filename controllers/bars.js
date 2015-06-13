var Bar = require('../models/Bar');

exports.index = function(req, res) {
  Bar.find({})
    .sort("name")
    .exec(function(err, bars) {
      res.render('bars/index', {
        bars: bars,
        title: 'All Bars'
      });
    });
};
