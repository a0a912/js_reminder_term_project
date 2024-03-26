const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const userModel = require("../models/userModel").userModel;

const userController = require("../controllers/userController");
var GITHUB_CLIENT_ID = "05fa5f192a9df29a8fe4";
var GITHUB_CLIENT_SECRET = "781d67f4315daac6b0b5d5d852e1db6517fafe94";
var GITHUB_CALLBACK_URL = "http://localhost:8000/auth/github/callback";
const githubLogin = new GithubStrategy({

    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    // console.log("Passport.js profile: ", profile);
    const userModelOutput = userModel.findOrCreate(profile, function (err, user) {
      return done(err, user);
    })
    
  }

  );

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
