// Require the express module
const express = require("express");
// Create an instance of the express application
const app = express();
// Require the path module
const path = require("path");
// Require the express-ejs-layouts module
const ejsLayouts = require("express-ejs-layouts");
// Require the reminder_controller module from the specified path
const session = require("express-session");
const passport = require("./middleware/passport");

const { forwardAuthenticated } = require("./middleware/checkAuth");
const indexRoute = require("./routes/indexRoute");

const reminderController = require("./controller/reminder_controller");
// Require the auth_controller module from the specified path
const authController = require("./controller/auth_controller");
const { req } = require("express");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
);

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// Parse incoming request bodies with urlencoded payloads
app.use(express.urlencoded({ extended: false }));

// Use EJS layouts for rendering views
app.use(ejsLayouts);

// Initialize stuff
app.use(passport.initialize());
app.use(passport.session());
app.use(indexRoute);

// Set the view engine to EJS
app.set("view engine", "ejs");

// Define routes for handling reminders
app.get("/reminders", isLoggedIn, reminderController.list);
app.get("/reminder/new", isLoggedIn, reminderController.new);
app.get("/reminder/:id", isLoggedIn, reminderController.listOne);
app.get("/reminder/:id/edit", isLoggedIn, reminderController.edit);
app.post("/reminder/", isLoggedIn, reminderController.create);
app.get("/auth/login", authController.login);

// Implement routes for updating and deleting reminders
// Update a reminder with the specified id
app.post("/reminder/update/:id", isLoggedIn, reminderController.update);
// Delete a reminder with the specified id
app.post("/reminder/delete/:id", isLoggedIn, reminderController.delete);

// Ignore for now
app.get("/register", authController.register);
app.get("/login", forwardAuthenticated, authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);
app.get("/logout", authController.logout);
app.get("/test", (req, res) => { 
  res.send("Test page");
}
);
app.listen(3001, function () {
  console.log(
    "Server running. Visit: http://localhost:3001/login in your browser 🚀"
  );
});
