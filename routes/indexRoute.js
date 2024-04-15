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
  res.render("layout", {
    user: req.user,
    sessionStore: req.sessionStore,
  });
});

// Route to render the admin page for admin users only
router.get("/admin", ensureAuthenticated, isAdmin, (req, res) => {
  res.render("layout_admin", {
    user: req.user,
    sessionStore: req.sessionStore,
    role: req.user.role,
    name: req.user.name
  });
});

// Route to check if the user is an admin and redirect them accordingly
router.get("/check_admin", ensureAuthenticated, check_admin, (req, res) => {
  // This route is accessible only to authenticated users.
  // The user is redirected based on their role.
});

router.post("/revoke-session/:sessionId", isAdmin, (req, res) => {
  const sessionId = req.params.sessionId;
  if (req.sessionStore && req.sessionStore.destroy) {
    req.sessionStore.destroy(sessionId, (err) => {
      if (err) {
        console.error("Error revoking session:", err);
        // Handle error appropriately, maybe send an error response
        res.status(500).send("Error revoking session");
      } else {
        // Session successfully revoked, redirect back to admin dashboard
        res.redirect("/admin");
      }
    });
  } else {
    // Session store or destroy method not available, send an error response
    console.error("Session store or destroy method not available");
    res.status(500).send("Error revoking session");
  }
});

// Function to check if the user is an admin and redirect them accordingly
function check_admin(req, res) {
  if (req.user.role === 'admin') {
    console.log("User is an admin");
    res.redirect("/admin");
  } else {
    console.log("User is not an admin");
    res.redirect("/dashboard");
  }
}

// Exporting the router module
module.exports = router;