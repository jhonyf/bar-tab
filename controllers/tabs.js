var Round = require('../models/Round'),
  Product = require('../models/Product');

/**
 * Displays all the tabs for user
 */
exports.index = function(req, res) {
  Round.find({ user: req.user.id })
    .sort({ is_open: -1, ordered_at: -1 })
    .populate("bar")
    .exec(function(err, rounds) {
      res.render('tabs/index', {
        tabs: rounds,
        title: 'Tabs'
      });
    });
};

/**
 * Shows all the drinks in the tab
 */
exports.show = function(req, res) {
  Round.findOne({ user: req.user.id, _id: req.params.tabId })
    .populate("product")
    .exec(function(err, round) {
      Product.populate(round.ordered_beverages, { "path": "product" }, function(err, orders) {
        res.render('tabs/show', {
          orders: orders,
          tab: round,
          title: 'Ordered Drinks'
        });
      });
    });
};

/**
 * Marks the tab as closed
 */
exports.pay= function(req, res) {
  Round.findOne({ user: req.user.id, _id: req.params.tabId })
    .exec(function(err, round) {
      round.is_open = false;
      round.save(function(err) {
        res.redirect("/tabs");
      });
    });
};
