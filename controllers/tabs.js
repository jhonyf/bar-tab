var Round = require('../models/Round');

/**
 * Displays all the tabs for user
 */
exports.index = function(req, res) {
  Round.find({ user: req.user.id })
    .sort({ is_open: 1, ordered_at: -1 })
    .populate("bar")
    .exec(function(err, rounds) {
      res.render('tabs/index', {
        tabs: rounds,
        title: 'Tabs'
      });
    });
};
