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
    reminders: [  {
      id: 1,
      title: "Grocery shopping",
      description: "Buy milk and bread from safeway",
      completed: false,
    }, ],
    userid: 2,
    username: "person2",
    password: "1234",
    email: "person2@email.com",
  },
  person3: {
    reminders: [  {
      id: 1,
      title: "Grocery shopping",
      description: "Buy milk and bread from safeway",
      completed: false,
    },],
    userid: 3,
    username: "person3",
    password: "1234",
    email: "person3@email.com",
  },
};

//for user in database
// if username = database.user

const userModel = {
  findOne: (username) => {
    const user = Object.values(Database).find((user) => user.username === username);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with username: ${username}`);
  },
  findById: (id) => {
    const user = Object.values(Database).find((user) => user.userid === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  findAll: () => {
    // Simulate asynchronous behavior by wrapping in a Promise
    return new Promise((resolve, reject) => {
      // Simulate delay with setTimeout
      setTimeout(() => {
        resolve(Database); // Resolve with all users from the database
      }, 100); // Delay for 100 milliseconds
    });
  },
};

let database_2 = {
  cindy: {
    reminders: [
      {
        id: 1,
        title: "Grocery shopping",
        description: "Buy milk and bread from safeway",
        completed: false,
      },
    ],
    user_details: {
      userid: 1,
      username: "cindy",
      password: "1234",
      email: "cindy@email.com",
    }
  },
  person2: {
    reminders: [  {
      id: 1,
      title: "Grocery shopping",
      description: "Buy milk and bread from safeway",
      completed: false,
    }, ],
    user_details: {
      userid: 2,
      username: "person2",
      password: "1234",
      email: "person2@email.com",
    }
  },
  person3: {
    reminders: [  {
      id: 1,
      title: "Grocery shopping",
      description: "Buy milk and bread from safeway",
      completed: false,
    },],
    user_details: {
      userid: 3,
      username: "person3",
      password: "1234",
      email: "person3@email.com",
    }
  },
}

module.exports = { userModel, Database, database_2 };
