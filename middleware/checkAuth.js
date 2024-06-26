// Export an object with three methods to be used as middleware

// Middleware to ensure that the user is authenticated
module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();  // Move to the next middleware
    }
    res.redirect("/auth/login");  // Redirect to the login page
  },

  // Middleware to forward the user if already authenticated
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();  // Move to the next middleware
    }
    res.redirect("/dashboard");  // Redirect to the dashboard
  },

  // Middleware to check if the user is an admin
  isAdmin: function (req, res, next) {
    if (req.user && req.user.role === 'admin') {
      return next();  // Move to the next middleware
    }
    res.status(403).send("Access denied"); // Send a 403 Forbidden status and message
  }
};