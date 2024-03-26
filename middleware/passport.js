const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const userModel = require("../models/userModel").userModel;

const userController = require("../controllers/userController");
const authController = require("../controllers/auth_controller");
const reminderController = require("../controller/reminder_controller");

  const localLogin = new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await userController.getUserByEmailIdAndPassword(email, password);
        return user
          ? done(null, user)
          : done(null, false, {
              message: "Your login details are not valid. Please try again",
            });
      } catch (err) {
        done(err);
      }
    }
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

passport.deserializeUser(async function (id, done) {
  try {
    let user = await userController.getUserById(id);
    if (user) {
      done(null, user);
    } else {
      done({ message: "User not found" }, null);
    }
  } catch (err) {
    done(err);
  }
});

module.exports = passport.use(localLogin).use(githubLogin);
