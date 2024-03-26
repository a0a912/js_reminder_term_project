// Importing the database module
let database = require("../database");

// Defining the remindersController object
let remindersController = {
  // GET /reminders
  // Renders the reminder index page with the list of reminders from the database
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  // GET /reminders/new
  // Renders the reminder create page
  new: (req, res) => {
    res.render("reminder/create");
  },

  // GET /reminders/:id
  // Renders the single reminder page with the details of the reminder with the specified id
  // If the reminder is not found, renders the reminder index page with the list of reminders
  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  // POST /reminders
  // Creates a new reminder with the provided title and description and adds it to the database
  // Redirects to the reminders index page
  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  // GET /reminders/:id/edit
  // Renders the reminder edit page with the details of the reminder with the specified id
  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  // PUT /reminders/:id
  // Updates the reminder with the specified id in the database with the provided data
  // Implementation is missing
  update: (req, res) => {
    // implementation here 👈
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    searchResult.title = req.body.title;
    searchResult.description = req.body.description;
    searchResult.completed = req.body.completed === "true";
    res.redirect("/reminders");
  },

  // DELETE /reminders/:id
  // Deletes the reminder with the specified id from the database
  // Implementation is missing
  delete: (req, res) => {
    // implementation here 👈
    // Get the ID of the reminder to be deleted from the request parameters
    let reminderToFind = req.params.id;
    // Find the reminder in the 'reminders' array of the 'cindy' object in the database
    // using the 'find' method and a callback function that checks if the 'id' of the reminder
    // matches the 'reminderToFind'
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    // Remove the found reminder from the 'reminders' array using the 'splice' method
    // The 'splice' method takes two arguments: the index at which to start removing elements
    // and the number of elements to remove. In this case, we are removing one element
    // starting at the index of the 'searchResult'
    //NOTE: This only removes Cindy's stuff. Later, we need to set it up to remove any target.
    database.cindy.reminders.splice(searchResult, 1);
    // Redirect the user to the '/reminders' route after the reminder has been deleted
    res.redirect("/reminders");
  },
};

// Exporting the remindersController object
module.exports = remindersController;