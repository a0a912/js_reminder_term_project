let Database = {
  cindy: {
    reminders: [
      {
        id: 1,
        title: "Grocery shopping",
        description: "Buy milk and bread from safeway",
        completed: false,
      },
    ],
    userid: 1,
    username: "cindy",
    password: "1234",
    email: "cindy@email.com",
  },
  person2: {
    reminders: [],
    userid: 2,
    username: "person2",
    password: "1234",
    email: "person2@email.com",
  },
  person3: {
    reminders: [],
    userid: 3,
    username: "person3",
    password: "1234",
    email: "person3@email.com",
  },
};

//for user in database
// if username = database.user

// Define a userModel object with various methods
const userModel = {
  // Find a user by email
  findOne: (email) => {
    // Search for a user with the given email in the database
    const user = database.find((user) => user.email === email);
    // If a user is found, return the user object
    if (user) {
      return user;
    }
    // If no user is found, throw an error
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  // Find a user by id
  findById: (id) => {
    // Search for a user with the given id in the database
    const user = database.find((user) => user.id === id);
    // If a user is found, return the user object
    if (user) {
      return user;
    }
    // If no user is found, throw an error
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  // Find or create a user based on a GitHub profile
  /*
  findOrCreate: (githubProfile, callback) => {
    // Search for a user with the given GitHub profile id in the database
    const user = database.find((user) => user.id === `${githubProfile.username}#${githubProfile.id}`);
    // If a user is found, call the callback function with the user object
    if (user) {
      callback(null, user);
    } else {
      // If no user is found, create a new user object based on the GitHub profile
      const githubUser = {
        id: `${githubProfile.username}#${githubProfile.id}`,
        name: githubProfile.username,
        email: githubProfile._json.email,
        password: null,
        role: 'user'
      };
      // Add the new user to the database
      database.push(githubUser);
      // Call the callback function with the new user object
      callback(null, githubUser);
    };


  }
  */
};

module.exports = Database;
