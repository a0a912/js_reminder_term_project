let database = require("../database");

const passport = require("../middleware/passport");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/login",
  }),

  registerSubmit: (req, res) => {
    // implement later
  },
};

module.exports = authController;
