module.exports = app => {
    const product = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Product
    router.post("/", product.create);
  
    // Retrieve all product
    router.get("/", product.findAll);

    // Delete a product with id
    router.delete("/:id", product.delete);
  
    app.use('/api/product', router);
  };