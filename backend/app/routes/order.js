module.exports = app => {
    const order = require("../controllers/order.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Order
    router.post("/", order.create);

     // filter by dates
     router.get("/search", order.searchByDate);
  
    // Retrieve all order
    router.get("/", order.findAll);
  
    // Retrieve a single Order with id
    router.get("/:id", order.findOne);
  
    // Update a Order with id
    router.put("/:id", order.update);
  
    // Delete a Order with id
    router.delete("/:id", order.delete);
  
    app.use('/api/order', router);
  };