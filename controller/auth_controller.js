let database = require("../database");
let Database = database.Database;
const passport = require("../middleware/passport");

let authController = {
  login: (req, res) => {
    res.render("auth/login", { role: 'user'});
  },

  register: (req, res) => {
    res.render("auth/register", { role: 'user' });
  },

  loginSubmit: passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/login",
  }),

  registerSubmit: (req, res) => {
    let newUser = {
      id: database.length + 1,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: "regular",
      reminders: [],
    };
    Database.push(newUser);
    res.redirect("/login");
  },

  logout: (req, res) => {
    req.logout(err => {
      if (err) console.log(err);
    });
    res.redirect("/login");
  },
};

module.exports = authController;
