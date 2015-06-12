exports.index = function(req, res) {
  res.render('bars/index', {
    title: 'All Bars'
  });
};
