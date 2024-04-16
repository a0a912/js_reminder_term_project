let Database = [
  {
    id: 1,
    name: "Cindy Doe",
    email: "cindy123@gmail.com",
    password: "test",
    role: "admin",
    reminders: [
      {
        id: 1,
        title: "Grocery shopping",
        description: "Buy milk and bread from safeway",
        completed: false,
      },
      {
        id: 2,
        title: "Grocery shopping2",
        description: "Buy milk and bread from safeway",
        completed: false,
      },
      {
        id: 3,
        title: "Grocery shopping3",
        description: "Buy milk and bread from safeway",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    name: "Jimmy Doe",
    email: "jimmy123@gmail.com",
    password: "test",
    role: "regular",
    reminders: [
      {
        id: 1,
        title: "Car shopping",
        description: "Buy a Honda Civic",
        completed: false,
      },
    ],
  },
];
//for user in database
// if username = database.user

const userModel = {
  findOne: (email) => {
    const user = Database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = Database.find((user) => user.id === id);
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
      id: 1,
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
      id: 2,
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
      id: 3,
      username: "person3",
      password: "1234",
      email: "person3@email.com",
    }
  },
}

module.exports = { userModel, Database, database_2 };
