module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        id_product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
        id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        price: Number,
        discount: Number,
        total_price: Number,
        quantity: Number
      },
      { timestamps: true }
    );
  
    const order = mongoose.model("orders", schema);
    return order;
  };