// New feature
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
let userController = require("../controller/userController")

const localLogin = new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      console.log(email, password)
      const user = userController.getUserByEmailIdAndPassword(email, password);
      return user
          ? done(null, user)
          : done(null, false, {
            message: "Your login details are not valid. Please try again",
          });
    }
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin);