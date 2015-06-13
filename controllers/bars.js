var Bar = require('../models/Bar'),
  Price = require('../models/Price'),
  Round = require('../models/Round'),
  moment = require('moment');

/**
 * Displays all bars
 */
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

/**
 * Shows all products for given bar
 */
exports.show = function(req, res) {
  Price.find({ bar: req.params.barId })
    .sort("name")
    .populate("product")
    .exec(function(err, prices) {
      Round.findOne({ user: req.user.id, bar: req.params.barId, is_open: true }, function (err, round) {
        res.render('bars/show', {
          round: round,
          prices: prices,
          title: 'Available Drinks'
        });
      });
    });
};

/**
 * Add product to the round
 */
exports.buy = function(req, res) {
  // find price of the product
  Price.findById(req.params.priceId, function (err, price) {
    // find user's current tab
    Round.findOne({ user: req.user.id, bar: price.bar, is_open: true }, function (err, round) {
      // if user have no open round, then create one
      if (!round) {
        round = new Round({ user: req.user.id, bar: price.bar, is_open: true, ordered_at: new Date() });
        round.save();
      }

      round.ordered_beverages.push({
        product: price.product,
        actual_price: price.price,
        ordered_at: new Date()
      });

      // running cost of all ordered drinks
      round.total_cost = round.total_cost ? round.total_cost + price.price : price.price;

      // saves the round and re-display the bar
      round.save(function(err) {
        Price.find({ bar: price.bar })
          .sort("name")
          .populate("product")
          .exec(function(err, prices) {

            ordered_time = moment().format("h:mm:ssa");
            req.flash('info', { msg: 'Your drink was added for $' + price.price + ' at ' + ordered_time  });
            res.render('bars/show', {
              round: round,
              prices: prices,
              title: 'Available Drinks'
            });
          });
      });
    });
  });
};
