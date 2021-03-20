module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", user.create);
  
    // Retrieve a single User with id
    router.post("/login", user.findOne);

    // Retrieve all users
    router.get("/", user.findAll);

    // Delete a User with id
    router.delete("/:id", user.delete);
  
    app.use('/api/user', router);
  };