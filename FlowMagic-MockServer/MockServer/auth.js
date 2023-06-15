const passport = require('passport')

module.exports = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // If the user is authenticated, continue to the route handler
  } else {
    res.redirect('/login'); // If the user is not authenticated, redirect them to the login page
  }
}
