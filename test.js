let database = require("./database");


for (user in database) {
    console.log(user);
    console.log(database[user]);

}