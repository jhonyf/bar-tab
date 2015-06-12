/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/bars');
  }
  res.render('home', {
    title: 'Home'
  });
};
