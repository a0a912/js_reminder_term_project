// Importing the database module
let database = require("../database").Database;
let { Database, userModel } = require("../database");

// user = userModel.findOne("person2");
// Defining the remindersController object
let remindersController = {
  // GET /reminders
  // Renders the reminder index page with the list of reminders from the database
  list: (req, res) => {
    let user = req.user
    res.render("reminder/index", { reminders: user.reminders });
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
    let user = req.user
    let reminderToFind = req.params.id;
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: user.reminders });
    }
  },

  // POST /reminders
  // Creates a new reminder with the provided title and description and adds it to the database
  // Redirects to the reminders index page
  create: (req, res) => {
    let user = req.user
    let reminder = {
      id: user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  // GET /reminders/:id/edit
  // Renders the reminder edit page with the details of the reminder with the specified id
  edit: (req, res) => {
    let user = req.user
    let reminderToFind = req.params.id;
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  // PUT /reminders/:id
  // Updates the reminder with the specified id in the database with the provided data
  update: (req, res) => {
    // Get the id of the reminder to update
    let reminderToUpdate = req.params.id;
    let user = req.user
    // Find the reminder in the array
    let index = user.reminders.findIndex(function (reminder) {
      return reminder.id == reminderToUpdate;
    });

    // If the reminder was found, update it
    if (index != -1) {
      user.reminders[index] = {
        id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed === 'true',  // convert string to boolean
      };
    }

    // Redirect the user back to the reminders list
    res.redirect("/reminders");
  },

  // DELETE /reminders/:id
  // Deletes the reminder with the specified id from the database
  // Implementation is missing
  delete: (req, res) => {
    let user = req.user
    // implementation here 👈
    // Get the ID of the reminder to be deleted from the request parameters
    let reminderToFind = req.params.id;
    // Find the reminder in the 'reminders' array of the 'cindy' object in the database
    // using the 'find' method and a callback function that checks if the 'id' of the reminder
    // matches the 'reminderToFind'
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    // Remove the found reminder from the 'reminders' array using the 'splice' method
    // The 'splice' method takes two arguments: the index at which to start removing elements
    // and the number of elements to remove. In this case, we are removing one element
    // starting at the index of the 'searchResult'
    //NOTE: This only removes Cindy's stuff. Later, we need to set it up to remove any target.
    user.reminders.splice(searchResult, 1);
    // Redirect the user to the '/reminders' route after the reminder has been deleted
    res.redirect("/reminders");
  },
};

// Exporting the remindersController object
module.exports = remindersController;