const db = require("../models");
const Product = db.product;

// Create and Save a new product
exports.create = (req, res) => {
   // Validate request
   if (!req.body.name && !req.body.unit_price && !req.body.stock && !req.body.currency) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a product
  const product = new Product({
    name: req.body.name,
    unit_price: req.body.unit_price,
    stock: req.body.stock,
    currency: req.body.currency,
    discount: req.body.discount
  });

  // Save product in the database
  product
    .save(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product."
      });
    });
};

// Retrieve all Product from the database.
exports.findAll = (req, res) => {
   Product.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Product."
        });
      });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Product.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      } else {
        res.send({
          message: "Product was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};