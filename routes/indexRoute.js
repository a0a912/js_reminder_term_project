// Importing the necessary modules
const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

// Route to render the index page
router.get("/", (req, res) => {
    //res.send("Hello World!");
  res.render("login");
});

// Route to render the dashboard page for authenticated users
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
    sessionStore: req.sessionStore,
  });
});

// Route to render the admin page for admin users only
router.get("/admin", isAdmin, (req, res) => {
  res.render("admin", {
    user: req.user,
    sessionStore: req.sessionStore
  });
});

// Route to check if the user is an admin and redirect them accordingly
router.get("/check_admin", ensureAuthenticated, check_admin, (req, res) => {
  // This route is accessible only to authenticated users.
  // The user is redirected based on their role.
});

// Function to check if the user is an admin and redirect them accordingly
function check_admin(req, res) {
  if (req.user.role === 'admin') {
    res.redirect("/admin");
  } else {
    res.redirect("/dashboard");
  }
}

// Exporting the router module
module.exports = router;