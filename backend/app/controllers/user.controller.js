const db = require("../models");
const User = db.user;

// Create and Save a new user
exports.create = (req, res) => {
   // Validate request
   if (!req.body.name && !req.body.username && !req.body.password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a user
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  });

  // Save user in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};

// Find a single user with an id
exports.findOne = (req, res) => {
    
  // Validate request
  if (!req.body.username && !req.body.password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

      if (req.body.password != user.password) {
        return res.status(401).send({
          message: "Invalid Password!"
        });
      }
      res.status(200).send({
        id: user.id,
        username: user.username,
        name: user.name,
        password: user.password
      });
    });
};

// Retrieve all Product from the database.
exports.findAll = (req, res) => {
  User.find()
     .then(data => {
       res.send(data);
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while retrieving User."
       });
     });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};
