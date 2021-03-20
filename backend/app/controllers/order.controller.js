const db = require("../models");
const Order = db.order;
const Product = db.product;

// Create and Save a new Order
exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Order
  const order = new Order({
    id_product: req.body.product_id,
    id_user: req.body.user_id,
    quantity: req.body.quantity,
    total_price: 0,
    discount: 0
  });
  Product.findById(req.body.product_id)
      .then(product => {

        if (product) {
          
          if(product.stock == 0)
          {
            return res.status(401).send({
              message: "Out of Stocks.."
            });
          }

          if(order.quantity > product.stock)
          {
            return res.status(401).send({
              message: "Insufficient quantity."
            });
          }
          order.price = product.unit_price;

          if(product.discount != null && order.quantity >= 3) {
            var total = parseFloat(product.unit_price) * parseInt(order.quantity);
            
            var discount = (total * (parseFloat(product.discount) / 100));
            console.log(discount)
            order.total_price = (total - discount).toFixed(2);
            order.discount = (total - discount).toFixed(2);
          } else
            order.total_price = parseFloat(product.unit_price) * parseInt(order.quantity);
            
          product.stock = parseInt(product.stock) - parseInt(order.quantity);
          
          Product
            .findByIdAndUpdate(product._id, product)
            .then(data => {
              console.log(data);
            })
          // Save Order in the database
          order
          .save(order)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Order."
            });
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Order."
        });
      });
};

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
  Order
    .aggregate([
    {
        $lookup: {
            from: "users",
            localField: "id_user",
            foreignField: "_id",
            as: "user"
        },
    },
    {
        $unwind: "$user",
    },
    {
        $lookup: {
            from: 'products',
            localField: "id_product",
            foreignField: "_id",
            as: "product"
        },
    },
    {
        $unwind: "$product",
    },
  ])
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Orders."
    });
  });
  
};

// Find a single Order with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Order.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Order with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Order with id=" + id });
      });
};

// Update a Order by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
      const order = {
        id_product: req.body.product_id,
        id_user: req.body.user_id,
        quantity: req.body.quantity
      };

      Order.findById(id)
      .then(p_order => {
        Product.findById(req.body.product_id)
        .then(product => {

          if (product) {
            const qty =  parseInt(product.stock) +  parseInt(p_order.quantity);

            if(order.quantity > qty)
            {
              return res.status(401).send({
                message: "Insufficient quantity."
              });
            }
            order.price = product.unit_price;
            order.total_price = parseFloat(product.unit_price) * parseInt(order.quantity);
            order.quantity = order.quantity;
            product.stock =  parseInt(qty) -  parseInt(order.quantity);
            Product
            .findByIdAndUpdate(req.body.product_id, product)
            .then(data => {
              console.log(data)
            })         
            // Update Order in the database
            Order
            .findByIdAndUpdate(id, order)
            .then(data => {
              res.send({ message: "Order was updated successfully." });
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Cannot update Order with id=${id}. Maybe Order was not found!"
              });
            });
          }
        })
      });
};

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Order.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
          });
        } else {
          res.send({
            message: "Order was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Order with id=" + id
        });
      });
};

// orders - filter by dates.
exports.searchByDate = (req, res) => {
  const id = req.params.filter;

  if(id == 'week') {
    var condn = {
      createdAt: {
        $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
      }
    };
  }
  else {
    today = new Date();
    today.setHours(0,0,0,0);
    var condn = {
      createdAt: { 
        "$gte": today
      }
    };

  }
  Order
    .aggregate([
      {
          $lookup: {
              from: "users",
              localField: "id_user",
              foreignField: "_id",
              as: "user"
          },
      },
      {
          $unwind: "$user",
      },
      {
          $lookup: {
              from: 'products',
              localField: "id_product",
              foreignField: "_id",
              as: "product"
          },
      },
      {
          $unwind: "$product",
      },
      { $match : condn },
    ])
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Orders."
      });
    });
    
};