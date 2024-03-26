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
  },

  // DELETE /reminders/:id
  // Deletes the reminder with the specified id from the database
  // Implementation is missing
  delete: (req, res) => {
    // implementation here 👈
  },
};

// Exporting the remindersController object
module.exports = remindersController;