// Import necessary packages and middleware
const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated, isAdmin } = require("../middleware/checkAuth");

// Create a new Express router
const router = express.Router();

// Route to display the login page, only accessible to unauthenticated users
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// Route to handle form submission for login
router.post("/login", (req, res, next) => {
    // Authenticate using the local strategy
    passport.authenticate("local", {
        successRedirect: "/check_admin", // Redirect to check_admin if login successful
        failureRedirect: "/auth/login", // Redirect back to login page if login fails
    })(req, res, next);
});

// Route to initiate GitHub authentication
router.get('/github',
    passport.authenticate('github'));

/*
// Route to handle user logout
router.post("/logout", (req, res) => {
    req.logout(function(err) {
        if (err) {
            console.error(err); // Log any errors during logout
            return next(err); // Proceed with next middleware if error occurs
        }
        res.redirect("/auth/login"); // Redirect to login page after successful logout
    });
});
*/
/*
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth/login');
});

 */

// Route to handle GitHub authentication callback
router.get('/github/callback',
    passport.authenticate('github', {
        successRedirect: '/', // Redirect to home page on successful GitHub authentication
        failureRedirect: '/login', // Redirect back to login page if GitHub authentication fails
        failureMessage: true }), // Display failure message if GitHub authentication fails
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/'); // Redirect to home page after successful GitHub authentication
    }
);

// Export the router to be used in other parts of the application
module.exports = router;