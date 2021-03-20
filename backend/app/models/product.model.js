module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        unit_price: Number,
        stock: Number,
        currency: String,
        discount: Number,
      },
      { timestamps: true }
    );
  
    const product = mongoose.model("products", schema);
    return product;
  };